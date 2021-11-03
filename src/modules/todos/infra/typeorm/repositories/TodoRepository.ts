import { getRepository, Repository } from 'typeorm'
import { ITodoRepository } from '@modules/todos/repositories/ITodoRepository'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'

class TodoRepository implements ITodoRepository {
  private repository: Repository<Todo>

  constructor() {
    this.repository = getRepository(Todo)
  }

  async createTodo(userId: string, body: string): Promise<Todo> {
    const todo = this.repository.create({
      user_id: userId,
      body,
    })
    await this.repository.save(todo)
    return todo
  }

  async setTodoStatus(todoId: string, status: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ completed: status })
      .where('todoId = :id')
      .setParameters({ todoId })
      .execute()
  }

  async deleteTodo(todoId: string): Promise<void> {
    await this.repository.delete(todoId)
  }

  async findTodosByUser(userId: string): Promise<Todo[]> {
    const todos = await this.repository.find({
      where: { user_id: userId },
      relations: ['user'],
    })
    return todos
  }
}

export { TodoRepository }
