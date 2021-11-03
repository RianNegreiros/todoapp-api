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

  async setTodoId(id: string, newId: string): Promise<void> {
    const todo = await this.repository.findOne(id)
    todo.id === newId
  }

  async deleteTodo(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findTodosByUser(id: string): Promise<Todo[]> {
    const todos = await this.repository.find({
      where: { id },
      relations: ["user"]
    })
    return todos
  }
}

export { TodoRepository }
