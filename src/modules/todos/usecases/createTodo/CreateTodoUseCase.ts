import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'

@injectable()
class CreateTodoUseCase {
  constructor(
    @inject('TodoRepository')
    private todoRepository: ITodoRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, body: string): Promise<Todo> {
    const user = await this.userRepository.findUserById(userId)
    if (!user) {
      throw new Error('User not found by this id')
    }
    return await this.todoRepository.createTodo(userId, body)
  }
}

export { CreateTodoUseCase }
