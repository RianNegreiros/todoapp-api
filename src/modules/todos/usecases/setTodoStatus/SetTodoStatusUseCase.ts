import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'

@injectable()
class SetTodoStatusUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute(userId: string, status: boolean): Promise<void> {
    return await this.todoRepository.setTodoStatus(userId, status)
  }
}

export { SetTodoStatusUseCase }
