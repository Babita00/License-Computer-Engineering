import { Response } from "express";
import { AppDataSource } from "../config/data-source";
import { HttpStatusCodes as STATUS } from "../constants/httpStatusCode";
import { Question } from "../model/question.entity";
import { CustomRequest } from "../interface/interfaces";

const repo = AppDataSource.getRepository(Question);

export const addQuestion = async (req: CustomRequest, res: Response) => {
  if (!req.user || req.user instanceof Error) {
    return res.status(STATUS.UNAUTHORIZED).json({ msg: "Login required" });
  }
  const user = req.user;

  const {
    chapter,
    question_text,
    options,
    explanation,
    explanation_image_url,
  } = req.body;

  const question = await repo.save({
    chapter,
    question_text,
    options,
    explanation,
    explanation_image_url,
    submitted_by_id: user.id,
    created_by_id: user.isAdmin ? user.id : null,
    status: user.isAdmin ? "approved" : "pending",
  });

  return res.status(STATUS.CREATED).json({
    status: STATUS.CREATED,
    message: user.isAdmin
      ? "Question approved instantly!"
      : "Question submitted for review!",
    data: question,
  });
};
export const getApprovedQuestion = async (
  _req: CustomRequest,
  res: Response
) => {
  const questions = await repo.find({
    where: { status: "approved" },
    select: ["id", "chapter", "question_text", "options", "explanation"],
  });
  return res.json({
    status: STATUS.OK,
    data: questions,
    total: questions.length,
  });
};

export const getAllQuestionForAdmin = async (
  _req: CustomRequest,
  res: Response
) => {
  const questions = await repo.find({
    relations: ["created_by", "submitted_by"],
    order: { created_at: "DESC" },
  });
  return res.json({
    status: STATUS.OK,
    data: questions,
    total: questions.length,
  });
};

export const approveQuestion = async (req: CustomRequest, res: Response) => {
  if (!req.user || req.user instanceof Error) {
    return res.status(STATUS.UNAUTHORIZED).json({ msg: "Login required" });
  }

  const { id } = req.params;
  const { status } = req.body as { status: "approved" | "rejected" };

  const question = await repo.findOneBy({ id });
  if (!question)
    return res.status(STATUS.NOT_FOUND).json({ msg: "Question not found" });

  question.status = status;
  question.approved_by_id = req.user.id;
  question.approved_at = new Date();

  await repo.save(question);

  return res.json({
    status: STATUS.OK,
    message: `Question ${status}!`,
    data: question,
  });
};

export const deleteQuestion = async (req: CustomRequest, res: Response) => {
  if (!req.user || req.user instanceof Error) {
    return res.status(STATUS.UNAUTHORIZED).json({ msg: "Login required" });
  }

  const { id } = req.params;
  await repo.delete(id);
  return res.json({ status: STATUS.OK, message: "Question deleted!" });
};
