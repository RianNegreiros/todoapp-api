import auth from '@config/auth'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRespository'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayLoad {
  sub: string
}

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization
  const userTokenRepository = new UserTokensRepository()

  if (!authHeader) {
    throw new Error('Token is required')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, auth.refresh_token) as IPayLoad

    const userExists = userTokenRepository.findByUserIdAndRefreshTokens(
      userId,
      token
    )

    if (!userExists) {
      throw new Error('User does not exists')
    }

    next()
  } catch {
    throw new Error('Invalid error')
  }
}
