import { Request, Response } from "express"
import { container } from 'tsyringe'
import { TodoService } from "../services/TodoService"

class TodoController {
    async createTodo(request: Request, response: Response) {
        const { userId, body } = request.body
        const todoService = container.resolve(TodoService)

        try {
            const todo = await todoService.createTodo({ userId, body })
            return response.status(201).json(todo)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async deleteTodo(request: Request, response: Response) {
        const { userId, todoId } = request.body
        const todoService = container.resolve(TodoService)

        try {
            await todoService.deleteTodo({ userId, todoId })
            return response.status(200)

        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async setToCompleted(request: Request, response: Response) {
        const { userId, todoId } = request.body
        const todoService = container.resolve(TodoService)

        try {
            const todo = await todoService.setCompleted({ userId, todoId })
            return response.status(200).json(todo)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async getAllCompleted(request: Request, response: Response) {
        const { userId } = request.body
        const todoService = container.resolve(TodoService)

        try {
            const todos = await todoService.getAllCompletedTodos(userId)
            return response.status(200).json(todos)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async getAll(request: Request, response: Response) {
        const { userId } = request.body
        const todoService = container.resolve(TodoService)

        try {
            const todos = await todoService.getAll(userId)
            return response.status(200).json(todos)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}

export { TodoController }