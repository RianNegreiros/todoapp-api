import { Request, Response } from "express"
import { TodoService } from "../services/TodoService"

class TodoController {
    constructor(private todoService: TodoService) {}
    async createTodo(request: Request, response: Response) {
        const { userId, body } = request.body

        try {
            const todo = await this.todoService.createTodo({ userId, body })
            return response.status(201).json(todo)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async deleteTodo(request: Request, response: Response) {
        const { userId, todoId } = request.body

        try {
            await this.todoService.deleteTodo({ userId, todoId })
            return response.status(200)

        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async setToCompleted(request: Request, response: Response) {
        const { userId, todoId } = request.body

        try {
            const todo = await this.todoService.setCompleted({ userId, todoId })
            return response.status(200).json(todo)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async getAllCompleted(request: Request, response: Response) {
        const { userId } = request.body

        try {
            const todos = await this.todoService.getAllCompletedTodos(userId)
            return response.status(200).json(todos)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async getAll(request: Request, response: Response) {
        const { userId } = request.body

        try {
            const todos = await this.todoService.getAll(userId)
            return response.status(200).json(todos)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}

export { TodoController }