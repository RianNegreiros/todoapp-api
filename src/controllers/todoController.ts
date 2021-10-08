import { Request, Response } from "express"
import todoService from "../services/todoService"

export const addTodo = async (request: Request, response: Response) => {
    const { userId, body } = request.body

    try {
        const todo = await todoService.addTodo({userId, body})
        return response.status(201).json(todo)
    } catch (error) {
        return response.status(400).json(error)
    }
}

export const deleteTodo = async (request: Request, response: Response) => {
    const { userId, todoId } = request.body

    try {
        await todoService.deleteTodo({userId, todoId})
        return response.status(200)

    } catch (error) {
        return response.status(400).json(error)
    }
}

export const setToCompleted = async (request: Request, response: Response) => {
    const { userId, todoId } = request.body

    try {
        const todo = await todoService.setCompleted({userId, todoId})
        return response.status(200).json(todo)
    } catch (error) {
        return response.status(400).json(error)
    }
}

export const getAllCompleted = async (request: Request, response: Response) => {
    const { userId } = request.body

    try {
        const todos = await todoService.getAllCompletedTodos(userId)
        return response.status(200).json(todos)
    } catch (error) {
        return response.status(400).json(error)
    }
}

export const getAll = async (request: Request, response: Response) => {
    const { userId } = request.body

    try {
        const todos = await todoService.getAll(userId)
        return response.status(200).json(todos)
    } catch (error) {
        return response.status(400).json(error)
    }
}