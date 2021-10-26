import { inject, injectable } from 'tsyringe'
import { ITodoRequest } from '@modules/todos/dtos/ITodoRequest'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'

@injectable()
class SetTodoCompletedUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute({ userId, todoId }: ITodoRequest) {
    return await this.todoRepository.setToCompleted(userId, todoId)
  }
}

export { SetTodoCompletedUseCase }
