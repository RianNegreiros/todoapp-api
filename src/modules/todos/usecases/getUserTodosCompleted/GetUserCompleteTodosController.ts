import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserCompletedTodosUseCase } from './GetUserCompletedTodosUseCase'

class GetUserCompleteTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body
    const getUserCompletedTodosUseCase = container.resolve(
      GetUserCompletedTodosUseCase
    )

    try {
      const todos = await getUserCompletedTodosUseCase.execute(userId)
      return response.status(200).json(todos)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { GetUserCompleteTodosController }
