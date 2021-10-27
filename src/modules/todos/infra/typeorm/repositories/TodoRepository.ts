import { getRepository, Repository } from 'typeorm'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'

class TodoRepository implements ITodoRepository {
  private repository: Repository<Todo>

  constructor() {
    this.repository = getRepository(Todo)
  }

  async createTodo(body: string, user: User): Promise<void> {
    this.repository.create({
      body,
      user
    })
  }

  async deleteTodo(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async setTodoStatus(id: string, status: boolean): Promise<void> {
    await this.repository
    .createQueryBuilder()
    .update()
    .set({ isCompleted: status })
    .where("id = :id")
    .setParameters({ id })
    .execute()
  }

  async getAllTodos(user: User): Promise<Todo[]> {
    return user.todos
  }

  async getAllCompleted(user: User): Promise<Todo[]> {
    return user.todos.filter((t) => t.isCompleted === true)
  }
}

export { TodoRepository }
