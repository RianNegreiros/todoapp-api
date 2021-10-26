import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from '@/modules/todos/repositories/ITodoRepository'

interface ICreateTodoRequest {
  userId: string
  body: string
}

@injectable()
class CreateTodoUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute({ userId, body }: ICreateTodoRequest) {
    return await this.todoRepository.createTodo(body, false, userId)
  }
}

export { CreateTodoUseCase }
