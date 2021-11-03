import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'

@injectable()
class GetUserTodosCompletedUseCase {
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
    const completedTodos = await this.todoRepository.findTodosByUser(userId)
    return completedTodos.filter((todo) => todo.isCompleted === true)
  }
}

export { GetUserTodosCompletedUseCase }
