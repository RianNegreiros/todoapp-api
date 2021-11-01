import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'

@injectable()
class SetTodoIdUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute(id: string, newId: string) {
    return await this.todoRepository.setTodoId(id, newId)
  }
}

export { SetTodoIdUseCase }
