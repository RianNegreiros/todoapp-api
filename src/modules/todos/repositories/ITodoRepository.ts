import { Todo } from '../entities/Todo'

interface ITodoRepository {
  createTodo(
    body: string,
    isCompleted: boolean,
    userId: string
  ): Promise<Todo | any>
  deleteTodo(userId: string, todoId: string): Promise<any>
  setToCompleted(userId: string, todoId: string): Promise<any>
  getAllTodos(userId: string): Promise<Todo[] | undefined>
  getAllCompleted(userId: string): Promise<Todo[] | any>
}

export { ITodoRepository }
