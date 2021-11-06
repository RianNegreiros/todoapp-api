import { inject, injectable } from 'tsyringe'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

@injectable()
class GetAllUncompletedTodosUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute(userId: string): Promise<Todo[]> {
    const user = await this.userRepository.findUserById(userId)
    if (!user) {
      throw new Error('User not found by this id')
    }
    return await this.todoRepository.findUncompletedTodos(userId)
  }
}

export { GetAllUncompletedTodosUseCase }
