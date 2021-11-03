import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { ITodoRepository } from '../ITodoRepository'

class TodoRepositoryInMemory implements ITodoRepository {
  private todos: Todo[] = []

  async createTodo(user_id: string, body: string): Promise<Todo> {
    const todo = new Todo()
    Object.assign(todo, {
      user_id,
      body,
    })
    this.todos.push(todo)

    return todo
  }

  async deleteTodo(id: string): Promise<void> {
    const todo = this.todos.filter((t) => t.id === id)
    this.todos.splice(this.todos.indexOf(todo[0]))
  }

  async setTodoStatus(id: string, status: boolean): Promise<void> {
    const todo = this.todos.find((t) => t.id === id)
    todo.completed = status
  }

  async findTodosByUser(id: string): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.user.id === id)
  }
}

export { TodoRepositoryInMemory }
