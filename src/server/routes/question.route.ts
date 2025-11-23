import express from "express";
import { userAuth, requireAuth, adminOnly } from "../auth/user.auth";
import {
  addQuestion,
  approveQuestion,
  deleteQuestion,
  getAllQuestionForAdmin,
  getApprovedQuestion,
} from "../controller/question.controller";

const router = express.Router();

router.get("/approved-question", userAuth, getApprovedQuestion);
router.get("/admin", userAuth, requireAuth, adminOnly, getAllQuestionForAdmin);
router.post(
  "/add",
  // userAuth, requireAuth,
  addQuestion
);
router.patch("/:id/approve", userAuth, requireAuth, adminOnly, approveQuestion);
router.delete("/:id", userAuth, requireAuth, adminOnly, deleteQuestion);

export default router;
