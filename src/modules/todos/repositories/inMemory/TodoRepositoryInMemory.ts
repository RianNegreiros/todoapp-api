import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { ITodoRepository } from '../ITodoRepository'

class TodoRepositoryInMemory implements ITodoRepository {
  private todos: Todo[] = []

  async createTodo(body: string, user: User): Promise<any> {
    const todo = new Todo()
    Object.assign(todo, {
      body,
      user,
    })
    this.todos.push(todo)
  }

  async deleteTodo(id: string): Promise<void> {
    const todo = this.todos.filter((t) => t.id === id)
    this.todos.splice(this.todos.indexOf(todo[0]))
  }

  async setTodoStatus(id: string, status: boolean): Promise<void> {
    const todo = this.todos.filter((t) => t.id === id)
    todo[0].isCompleted = status
  }

  async getAllTodos(user: User): Promise<Todo[]> {
    return user.todos
  }

  async getAllCompleted(user: User): Promise<Todo[]> {
    return user.todos.filter((t) => t.isCompleted === true)
  }
}

export { TodoRepositoryInMemory }
