import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { GetUserAllTodosUseCase } from './GetUserAllTodosUseCase'

class GetUserAllTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body
    const getUserAllTodosUseCase = container.resolve(GetUserAllTodosUseCase)

    try {
      const todos = await getUserAllTodosUseCase.execute(userId)
      return response.status(200).json(todos)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { GetUserAllTodosController }
