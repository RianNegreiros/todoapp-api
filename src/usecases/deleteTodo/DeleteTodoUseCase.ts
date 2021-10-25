import { inject, injectable } from "tsyringe"
import { ITodoRepository } from "../../data/repositories/ITodoRepository"

interface ITodoRequest {
  userId: number
  todoId: number
}

@injectable()
class DeleteTodoUseCase {
  constructor(
    @inject("TodoRepository")
    private todoRepository: ITodoRepository
  ) { }

  async execute
  ({ userId, todoId }: ITodoRequest) {
    return await this.todoRepository.deleteTodo(userId, todoId)
  }
}

export { DeleteTodoUseCase }