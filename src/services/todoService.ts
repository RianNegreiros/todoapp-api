import { inject, injectable } from 'tsyringe'
import { ITodoRepository } from "../data/repositories/ITodoRepository"

interface ICreateTodoRequest {
    userId: number
    body: string
}

interface ITodoRequest {
    userId: number
    todoId: number
}

@injectable()
class TodoService {
    constructor(
        @inject("TodoRepository")
        private todoRepository: ITodoRepository
        ) { }

    async createTodo({ userId, body }: ICreateTodoRequest) {
        return await this.todoRepository.createTodo(body, false, userId)
    }

    async setCompleted({ userId, todoId }: ITodoRequest) {
        return await this.todoRepository.setToCompleted(userId, todoId)
    }

    async deleteTodo({ userId, todoId }: ITodoRequest) {
        return await this.todoRepository.deleteTodo(userId, todoId)
    }

    async getAll({ userId }: ITodoRequest) {
        return await this.todoRepository.getAllTodos(userId)
    }

    async getAllCompletedTodos({ userId }: ITodoRequest) {
        return await this.todoRepository.getAllCompleted(userId)
    }
}

export { TodoService }