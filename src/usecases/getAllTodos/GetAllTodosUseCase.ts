import { inject, injectable } from "tsyringe"
import { ITodoRepository } from "../../data/repositories/ITodoRepository"

interface ITodoRequest {
  userId: number
  todoId: number
}

@injectable()
class GetAllTodosUseCase {
  constructor(
    @inject("TodoRepository")
    private todoRepository: ITodoRepository
  ) { }

  async execute({ userId }: ITodoRequest) {
    return await this.todoRepository.getAllTodos(userId)
  }
}

export { GetAllTodosUseCase }