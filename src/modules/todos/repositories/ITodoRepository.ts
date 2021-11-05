import { Todo } from '../infra/typeorm/entities/Todo'

interface ITodoRepository {
  createTodo(userId: string, body: string): Promise<Todo>
  setTodoStatus(todoId: string, status: boolean): Promise<void>
  deleteTodo(todoId: string): Promise<void>
  clearCompletedsTodos(userId: string): Promise<void>
  findTodosByUser(userId: string): Promise<Todo[]>
  findCompletedTodos(userId: string): Promise<Todo[]>
  findTodoById(todoId: string): Promise<Todo>
}

export { ITodoRepository }
