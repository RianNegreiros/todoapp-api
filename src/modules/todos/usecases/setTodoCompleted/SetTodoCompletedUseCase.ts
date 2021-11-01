import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'

@injectable()
class SetTodoCompletedUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute(userId: string, status: boolean) {
    return await this.todoRepository.setTodoStatus(userId, status)
  }
}

export { SetTodoCompletedUseCase }
