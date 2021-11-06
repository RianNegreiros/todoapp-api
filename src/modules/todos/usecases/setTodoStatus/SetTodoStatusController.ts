import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SetTodoStatusUseCase } from './SetTodoStatusUseCase'

class SetTodoStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { todoId, status } = request.body
    const setTodoStatusUseCase = container.resolve(SetTodoStatusUseCase)

    try {
      await setTodoStatusUseCase.execute(todoId, status)
      return response.status(200).send()
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { SetTodoStatusController }
