import { AppDataSource } from '../config/data-source'
import { User } from '../model/user.entity'

export const userRepo = AppDataSource.getRepository(User)
