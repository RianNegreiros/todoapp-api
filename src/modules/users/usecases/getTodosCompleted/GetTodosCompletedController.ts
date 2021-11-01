import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTodosCompletedUseCase } from './GetTodosCompletedUseCase'

class GetTodosCompletedController {
  async handle(request: Request, response: Response) {
    const { userId } = request.body
    const getTodosCompletedUseCase = container.resolve(
      GetTodosCompletedUseCase
    )

    try {
      const todos = await getTodosCompletedUseCase.execute(userId)
      return response.status(200).json(todos)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { GetTodosCompletedController }
