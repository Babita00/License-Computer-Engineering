import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'
import logger from './logger'

dotenv.config()

const accessSecret = process.env.JWT_SECRET_ACCESS as Secret
const refreshSecret = process.env.JWT_SECRET_REFRESH as Secret

if (!accessSecret || !refreshSecret) {
  logger.error('JWT secret environment variables are missing.')
  throw new Error()
}

export const generateAccessToken = (payload: string | object) => {
  return jwt.sign(payload, accessSecret, {
    expiresIn: '7d',
  })
}

export const generateRefreshToken = (payload: string | object) => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: '30d',
  })
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret as jwt.Secret)
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret as jwt.Secret)
}
