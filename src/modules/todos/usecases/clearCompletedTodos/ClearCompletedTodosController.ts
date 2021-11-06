import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ClearCompletedTodosUseCase } from './ClearCompletedTodosUseCase'

class ClearCompletedTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body
    const clearCompletedTodosUseCase = container.resolve(
      ClearCompletedTodosUseCase
    )

    try {
      await clearCompletedTodosUseCase.execute(userId)
      return response.status(200).send()
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { ClearCompletedTodosController }
