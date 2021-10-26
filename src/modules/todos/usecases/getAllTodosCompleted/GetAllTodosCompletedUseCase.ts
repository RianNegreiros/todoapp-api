import { inject, injectable } from 'tsyringe'
import { ITodoRequest } from '../../dtos/ITodoRequest'
import { ITodoRepository } from '../../repositories/ITodoRepository'

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
