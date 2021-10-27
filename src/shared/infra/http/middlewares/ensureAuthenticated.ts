import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import auth from '@config/auth'

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('Token is required')
  }

  const [, token] = authHeader.split(' ')

  try {
    verify(token, auth.jwt_token)
    next()
  } catch {
    throw new Error('Invalid token')
  }
}
