import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserTodosCompletedUseCase } from './GetUserTodosCompletedUseCase'

class GetUserTodosCompletedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body
    const getUserTodosCompletedUseCase = container.resolve(
      GetUserTodosCompletedUseCase
    )

    try {
      const todos = await getUserTodosCompletedUseCase.execute(userId)
      return response.status(200).json(todos)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { GetUserTodosCompletedController }
