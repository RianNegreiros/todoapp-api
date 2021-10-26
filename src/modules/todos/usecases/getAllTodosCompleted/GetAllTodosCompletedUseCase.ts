import { inject, injectable } from 'tsyringe'
import { ITodoRequest } from '@/modules/todos/dtos/ITodoRequest'
import { ITodoRepository } from '@/modules/todos/repositories/ITodoRepository'

@injectable()
class GetAllTodosCompletedUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute({ userId }: ITodoRequest) {
    return await this.todoRepository.getAllCompleted(userId)
  }
}

export { GetAllTodosCompletedUseCase }
