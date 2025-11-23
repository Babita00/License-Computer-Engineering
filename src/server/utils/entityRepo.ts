import { AppDataSource } from "../database/database";
import { User } from "../model/user.entity";

export const userRepo = AppDataSource.getRepository(User);
