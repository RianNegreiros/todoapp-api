import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import env from '../../../config/env'

interface IPayLoad {
  sub: string
}

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('Token is required')
  }

  const token = authHeader.replace('Bearer', '').trim()

  try {
    const { sub: userId } = verify(token, env.jwtSecret) as IPayLoad

    const userRepository = new UserRepository()
    const userExists = userRepository.findUserById(userId)

    if (!userExists) {
      throw new Error('User does not exists')
    }

    next()
  } catch {
    throw new Error('Invalid error')
  }
}