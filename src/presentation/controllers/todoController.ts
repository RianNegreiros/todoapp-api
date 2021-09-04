import { Request, Response } from "express";
import todoRepository from "../../data/repositories/todoRepository";
import userRepository from "../../data/repositories/userRepository";

export const addTodo = async (request: Request, response: Response) => {
    const { userId, body } = request.body

    const user = await userRepository.findById(userId)

    try {
        const savedTodo = await todoRepository.addTodo(body, false, user)
        return response.status(201).json(savedTodo)
    } catch (error) {
        return response.status(400).json(error)
    }
}

export const deleteTodo = async (request: Request, response: Response) => {
    const { userId, todoId } = request.body

    try {
        await todoRepository.deleteTodo(userId, todoId)
        return response.status(200)

    } catch (error) {
        return error
    }
}

export const setToCompleted = async (request: Request, response: Response) => {
    const { userId, todoId } = request.body

    try {
        await todoRepository.setToCompleted(userId, todoId)
        return response.status(200)
    } catch (error) {
        return response.status(400).json(error)
    }
}

export const getAllCompleted = async (request: Request, response: Response) => {
    const { userId } = request.body

    try {
        const todos = await todoRepository.getAllCompleted(userId)
        return response.status(200).json(todos)
    } catch (error) {
        return response.status(400).json(error)
    }
}

export const getAll = async (request: Request, response: Response) => {
    const { userId } = request.body

    try {
        const todos = await todoRepository.getAllTodos(userId)
        return response.status(200).json(todos)
    } catch (error) {
        return response.status(400).json(error)
    }
}