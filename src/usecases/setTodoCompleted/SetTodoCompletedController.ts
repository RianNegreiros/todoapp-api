import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SetTodoCompletedUseCase } from './SetTodoCompletedUseCase'

class SetTodoCompletedController {
  async handle(request: Request, response: Response) {
    const { userId, todoId } = request.body
    const setTodoCompletedUseCase = container.resolve(SetTodoCompletedUseCase)

    try {
      const todo = await setTodoCompletedUseCase.execute({ userId, todoId })
      return response.status(200).json(todo)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { SetTodoCompletedController }