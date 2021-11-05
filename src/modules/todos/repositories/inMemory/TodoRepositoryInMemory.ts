import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { ITodoRepository } from '../ITodoRepository'

class TodoRepositoryInMemory implements ITodoRepository {
  private todos: Todo[] = []

  async createTodo(userId: string, body: string): Promise<Todo> {
    const todo = new Todo()
    Object.assign(todo, {
      user_id: userId,
      body,
    })
    this.todos.push(todo)

    return todo
  }

  async deleteTodo(todoId: string): Promise<void> {
    const todo = this.todos.filter((t) => t.id === todoId)
    this.todos.splice(this.todos.indexOf(todo[0]))
  }

  async setTodoStatus(todoId: string, status: boolean): Promise<void> {
    const todo = this.todos.find((t) => t.id === todoId)
    todo.completed = status
  }

  async findTodosByUser(userId: string): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.user_id === userId)
  }

  async findCompletedTodos(userId: string): Promise<Todo[]> {
    return this.todos.filter(
      (todo) => todo.user_id === userId && todo.completed === true
    )
  }

  async findTodoById(todoId: string): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === todoId)
    return todo
  }

  async clearCompletedsTodos(userId: string): Promise<void> {
    const completeds = this.todos.filter(
      (todo) => todo.user_id === userId && todo.completed === true
    )
    completeds.splice(0, completeds.length)
  }
}

export { TodoRepositoryInMemory }
