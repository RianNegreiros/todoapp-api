import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, email, password, confirmPassword } = request.body
    const createUserUseCase = container.resolve(CreateUserUseCase)

    try {
      const user = await createUserUseCase.execute({ username, email, password, confirmPassword });
      return response.status(201).json(user)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { CreateUserController }