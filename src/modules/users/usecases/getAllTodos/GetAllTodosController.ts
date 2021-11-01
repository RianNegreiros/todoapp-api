import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { GetAllTodosUseCase } from './GetAllTodosUseCase'

class GetAllTodosController {
  async handle(request: Request, response: Response) {
    const { userId } = request.body
    const getAllTodosUseCase = container.resolve(GetAllTodosUseCase)

    try {
      const todos = await getAllTodosUseCase.execute(userId)
      return response.status(200).json(todos)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { GetAllTodosController }
