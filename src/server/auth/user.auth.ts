import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCodes as STATUS } from "../constants/httpStatusCode";
import { User } from "../model/user.entity";
import { CustomRequest } from "../interface/interfaces";
import { AppDataSource } from "../config/data-source";

const JWT_SECRET = process.env.JWT_SECRET!;

export const userAuth = async (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: payload.id },
      select: ["id", "email", "name", "isAdmin"],
    });

    if (!user) {
      req.user = new Error("User not found");
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    req.user = error instanceof Error ? error : new Error("Invalid token");
    next();
  }
};

export const requireAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user instanceof Error) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .json({ msg: "Authentication required" });
  }
  next();
};

export const adminOnly = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user instanceof Error) {
    return res.status(STATUS.UNAUTHORIZED).json({ msg: "Login required" });
  }
  if (!(req.user as User).isAdmin) {
    return res.status(STATUS.FORBIDDEN).json({ msg: "Admin access only" });
  }
  next();
};
