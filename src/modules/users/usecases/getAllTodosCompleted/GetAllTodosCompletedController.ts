import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAllTodosCompletedUseCase } from './GetAllTodosCompletedUseCase'

class GetAllTodosCompletedController {
  async handle(request: Request, response: Response) {
    const { userId } = request.body
    const getAllTodosCompletedUseCase = container.resolve(
      GetAllTodosCompletedUseCase
    )

    try {
      const todos = await getAllTodosCompletedUseCase.execute(userId)
      return response.status(200).json(todos)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { GetAllTodosCompletedController }
