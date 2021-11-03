import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'

@injectable()
class SetTodoStatusUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute(todoId: string, status: boolean): Promise<void> {
    await this.todoRepository.setTodoStatus(todoId, status)
  }
}

export { SetTodoStatusUseCase }
