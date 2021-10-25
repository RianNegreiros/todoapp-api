import { Todo } from "../entities/Todo"

export interface ITodoRepository {
    createTodo(body: string, isCompleted: boolean, userId: number): Promise<Todo | any>
    deleteTodo(userId: number, todoId: number): Promise<any>
    setToCompleted(userId: number, todoId: number): Promise<any>
    getAllTodos(userId: number): Promise<Todo[] | undefined>
    getAllCompleted(userId: number): Promise<Todo[] | any>
}