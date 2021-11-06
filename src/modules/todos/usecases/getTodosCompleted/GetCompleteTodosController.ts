import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCompletedTodosUseCase } from './GetCompletedTodosUseCase'

class GetCompleteTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body
    const getCompletedTodosUseCase = container.resolve(
      GetCompletedTodosUseCase
    )

    try {
      const todos = await getCompletedTodosUseCase.execute(userId)
      return response.status(200).json(todos)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { GetCompleteTodosController }
