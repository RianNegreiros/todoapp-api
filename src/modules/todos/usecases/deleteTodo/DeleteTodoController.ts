import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteTodoUseCase } from './DeleteTodoUseCase'

class DeleteTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, todoId } = request.body
    const deleteTodoUseCase = container.resolve(DeleteTodoUseCase)

    try {
      await deleteTodoUseCase.execute(userId, todoId)
      return response.status(200).send()
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { DeleteTodoController }
