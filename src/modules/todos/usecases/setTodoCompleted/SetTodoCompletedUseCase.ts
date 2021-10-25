import { inject, injectable } from "tsyringe"
import { ITodoRepository } from "../../repositories/ITodoRepository"

interface ITodoRequest {
  userId: number
  todoId: number
}

@injectable()
class SetTodoCompletedUseCase {
  constructor(
    @inject("TodoRepository")
    private todoRepository: ITodoRepository
  ) { }

  async execute({ userId, todoId }: ITodoRequest) {
    return await this.todoRepository.setToCompleted(userId, todoId)
  }
}

export { SetTodoCompletedUseCase }