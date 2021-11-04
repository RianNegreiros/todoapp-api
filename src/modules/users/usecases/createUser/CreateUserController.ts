import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password, confirmPassword }: IRegisterUserRequest = request.body
    const createUserUseCase = container.resolve(CreateUserUseCase)

    try {
      await createUserUseCase.execute({
        username,
        email,
        password,
        confirmPassword,
      })
      return response.status(201).send()
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { CreateUserController }
