import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SetTodoStatusUseCase } from './SetTodoStatusUseCase'

class SetTodoStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, status } = request.body
    const setTodoStatusUseCase = container.resolve(SetTodoStatusUseCase)

    try {
      const todo = await setTodoStatusUseCase.execute(userId, status)
      return response.status(200).json(todo)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { SetTodoStatusController }
