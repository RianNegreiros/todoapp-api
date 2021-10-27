import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { User } from '@modules/users/infra/typeorm/entities/User'

interface ITodoRepository {
  createTodo(
    body: string,
    user: User
  ): Promise<void>
  deleteTodo(id: string): Promise<void>
  setTodoStatus(id: string, status: boolean): Promise<void>
  getAllTodos(user: User): Promise<Todo[]>
  getAllCompleted(user: User): Promise<Todo[]>
}

export { ITodoRepository }
