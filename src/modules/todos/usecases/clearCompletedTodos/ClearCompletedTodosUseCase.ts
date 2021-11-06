import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'

@injectable()
class ClearCompletedTodosUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findUserById(userId)
    if (!user) {
      throw new Error('User not found by this id')
    }
    await this.todoRepository.clearCompletedsTodos(userId)
  }
}

export { ClearCompletedTodosUseCase }
