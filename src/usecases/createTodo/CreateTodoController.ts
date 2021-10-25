import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateTodoUseCase } from "./CreateTodoUseCase"

class CreateTodoController {
  async handle(request: Request, response: Response) {
    const { userId, body } = request.body
    const createTodoUseCase = container.resolve(CreateTodoUseCase)

    try {
      const todo = await createTodoUseCase.execute({ userId, body })
      return response.status(201).json(todo)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { CreateTodoController }