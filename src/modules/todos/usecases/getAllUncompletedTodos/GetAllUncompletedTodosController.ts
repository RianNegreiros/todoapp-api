import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAllUncompletedTodosUseCase } from './GetAllUncompletedTodosUseCase'

class GetAllUncompletedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body
    const getAllUncompletedTodosUseCase = container.resolve(
      GetAllUncompletedTodosUseCase
    )

    try {
      const todos = await getAllUncompletedTodosUseCase.execute(userId)
      return response.status(200).json(todos)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { GetAllUncompletedController }
