import { getRepository, Repository } from 'typeorm'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'

class TodoRepository implements ITodoRepository {
  private repository: Repository<Todo>

  constructor() {
    this.repository = getRepository(Todo)
  }

  async createTodo(body: string): Promise<void> {
    this.repository.create({
      body,
    })
  }

  async setTodoStatus(id: string, status: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ isCompleted: status })
      .where('id = :id')
      .setParameters({ id })
      .execute()
  }

  async deleteTodo(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { TodoRepository }
