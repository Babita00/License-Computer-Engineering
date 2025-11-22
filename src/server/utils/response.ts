import { type Response } from 'express'
import { ErrorPayload, SuccessPayload } from '~/types/response'

export const successResponse = <T>(
  res: Response,
  status: number,
  message?: string,
  data?: T
): Response => {
  const payload: SuccessPayload<T> = { success: true }
  if (message) {
    payload.message = message
  }
  if (data !== undefined) {
    payload.data = data
  }
  return res.status(status).json(payload)
}

export const errorResponse = (
  res: Response,
  status: number,
  message: string,
  info?: unknown
): Response => {
  const payload: ErrorPayload = { success: false, message }
  if (info !== undefined) {
    payload.info = info
  }
  return res.status(status).json(payload)
}
