import { inject, injectable } from 'tsyringe'
import { ITodoRequest } from '../../dtos/ITodoRequest'
import { ITodoRepository } from '../../repositories/ITodoRepository'
@injectable()
class DeleteTodoUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute({ userId, todoId }: ITodoRequest) {
    return await this.todoRepository.deleteTodo(userId, todoId)
  }
}

export { DeleteTodoUseCase }
