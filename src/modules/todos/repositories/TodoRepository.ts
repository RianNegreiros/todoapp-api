import { getManager } from 'typeorm'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { Todo } from '@modules/todos/entities/Todo'
import { ITodoRepository } from './ITodoRepository'

class TodoRepository implements ITodoRepository {
  constructor(private userRepository: UserRepository) {}

  async createTodo(
    body: string,
    isCompleted: boolean,
    userId: string
  ): Promise<void> {
    const user = await this.userRepository.findUserById(userId)

    if (user === null) {
      throw new Error('User not found by this id')
    }

    await getManager().save({
      body: body,
      isCompleted,
      user: user,
    })
  }

  async deleteTodo(userId: string, todoId: string): Promise<void> {
    const user = await this.userRepository.findUserById(userId)
    user.todos?.find((t) => t.id === todoId)
    await getManager().delete(Todo, todoId)
  }

  async setToCompleted(userId: string, todoId: string): Promise<void> {
    const user = await this.userRepository.findUserById(userId)
    user.todos?.find((t) => t.id === todoId)
    await getManager().update(Todo, todoId, { isCompleted: true })
  }

  async getAllTodos(userId: string): Promise<Todo[] | undefined> {
    const user = await this.userRepository.findUserById(userId)
    const todos = user.todos
    return todos
  }

  async getAllCompleted(userId: string): Promise<Todo[] | undefined> {
    const user = await this.userRepository.findUserById(userId)
    const todos = user.todos?.filter((t) => t.isCompleted === true)
    return todos
  }
}

export { TodoRepository }
