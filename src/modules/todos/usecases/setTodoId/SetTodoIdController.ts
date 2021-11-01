import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SetTodoIdUseCase } from './SetTodoIdUseCase'

class SetTodoIdController {
  async handle(request: Request, response: Response) {
    const { todoId, newId } = request.body
    const setTodoIdUseCase = container.resolve(SetTodoIdUseCase)

    try {
      const todo = await setTodoIdUseCase.execute(todoId, newId)
      return response.status(200).json(todo)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { SetTodoIdController }
