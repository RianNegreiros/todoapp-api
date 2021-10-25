import { inject, injectable } from "tsyringe";
import { ITodoRepository } from "../../data/repositories/ITodoRepository";

interface ICreateTodoRequest {
  userId: number
  body: string
}

@injectable()
class CreateTodoUseCase {
  constructor(
    @inject("TodoRepository")
    private todoRepository: ITodoRepository
  ) { }

  async execute({ userId, body }: ICreateTodoRequest) {
    return await this.todoRepository.createTodo(body, false, userId)
  }
}

export { CreateTodoUseCase }