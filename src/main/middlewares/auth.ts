import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/env'

export const auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({ error: 'Token is required.' })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    jwt.verify(token, env.jwtSecret)
    next()
  } catch(error) {
    return response.status(401).json({ error: 'Token invalid.' })
  }
}