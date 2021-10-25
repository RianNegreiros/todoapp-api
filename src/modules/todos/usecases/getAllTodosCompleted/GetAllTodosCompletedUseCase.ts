import { inject, injectable } from "tsyringe"
import { ITodoRepository } from "../../repositories/ITodoRepository"

interface ITodoRequest {
  userId: number
  todoId: number
}

@injectable()
class GetAllTodosCompletedUseCase {
  constructor(
    @inject("TodoRepository")
    private todoRepository: ITodoRepository
  ) { }
  
  async execute({ userId }: ITodoRequest) {
    return await this.todoRepository.getAllCompleted(userId)
  }
}

export { GetAllTodosCompletedUseCase }