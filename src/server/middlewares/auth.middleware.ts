import dotenv from "dotenv";
import { Response, NextFunction } from "express";

import { verifyAccessToken } from "../utils/token";
import { errorResponse } from "../utils/response";
import { HttpStatusCodes as STATUS } from "../constants/httpStatusCode";
import { CustomRequest } from "../interface/interfaces";
import { userRepo } from "../utils/entityRepo";

dotenv.config();

interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const userAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, STATUS.UNAUTHORIZED, "Unauthorized Access");
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token) as JwtPayload;
    if (!payload) {
      return errorResponse(
        res,
        STATUS.UNAUTHORIZED,
        "Invalid or expired access token"
      );
    }

    const user = await userRepo.findOneBy({ id: payload.id });

    if (!user) {
      return errorResponse(res, STATUS.UNAUTHORIZED, "Unauthorized Access");
    }

    req.user = user;
    next();
  } catch {
    return errorResponse(
      res,
      STATUS.UNAUTHORIZED,
      "Invalid Request, Token Expired!"
    );
  }
};
