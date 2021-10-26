import { Todo } from '@modules/todos/entities/Todo'

interface ITodoRepository {
  createTodo(
    body: string,
    isCompleted: boolean,
    userId: string
  ): Promise<Todo | any>
  deleteTodo(userId: string, todoId: string): Promise<void>
  setToCompleted(userId: string, todoId: string): Promise<void>
  getAllTodos(userId: string): Promise<Todo[] | undefined>
  getAllCompleted(userId: string): Promise<Todo[] | undefined>
}

export { ITodoRepository }
