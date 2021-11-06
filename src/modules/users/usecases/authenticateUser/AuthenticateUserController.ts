import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IAuthRequest } from '@modules/users/dtos/IAuthRequest'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password }: IAuthRequest = request.body
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    try {
      const tokens = await authenticateUserUseCase.execute({ email, password })
      return response.status(200).json(tokens)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { AuthenticateUserController }
