import { Todo } from '../entities/Todo'
import { getManager } from "typeorm"
import { UserRepository } from '../../users/repositories/UserRepository'
import { ITodoRepository } from './ITodoRepository'

class TodoRepository implements ITodoRepository {
    constructor(private userRepository: UserRepository) { }

    async createTodo(body: string, isCompleted: boolean, userId: string) {

        const user = await this.userRepository.findUserById(userId)

        if (user === null) {
            throw new Error("User not found by this id")
        }

        const todo = await getManager().save({
            body: body,
            isCompleted,
            user: user
        })

        return todo
    }

    async deleteTodo(userId: string, todoId: string) {
        const user = await this.userRepository.findUserById(userId)
        user.todos?.find(t => t.id === todoId)

        return await getManager().delete(Todo, todoId)
    }

    async setToCompleted(userId: string, todoId: string) {
        const user = await this.userRepository.findUserById(userId)
        user.todos?.find(t => t.id === todoId)

        return await getManager().update(Todo, todoId, { isCompleted: true })
    }

    async getAllTodos(userId: string) {
        const user = await this.userRepository.findUserById(userId)
        const todos = user.todos

        return todos
    }

    async getAllCompleted(userId: string) {
        const user = await this.userRepository.findUserById(userId)
        const todos = user.todos?.find(t => t.isCompleted === true)

        return todos
    }
}

export { TodoRepository }