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

  async findCompletedTodos(id: string): Promise<Todo[]> {
    return this.todos.filter(
      (todo) => todo.user_id === id && todo.completed === true
    )
  }

  async findTodoById(id: string): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id)
    return todo
  }
}

export { TodoRepositoryInMemory }
