import { Todo } from '../../domain/models/todo'
import { getManager } from "typeorm";
import { User } from "../../domain/models/user";
import userRepository from './userRepository';

class todoRepository {

    async getAllTodos(userId: number) {
        const user = await userRepository.findById(userId)
        const todos = user.todos

        return todos
    }

    async addTodo(body: string, isCompleted: boolean, user: User) {

        const todo = await getManager().save({
            body: body,
            isCompleted,
            user: user
        })

        return todo
    }

    async deleteTodo(userId: number, todoId: number) {
        const user = await userRepository.findById(userId)
        user.todos.find(t => t.id === todoId)

        return await getManager().delete(Todo, todoId)
    }

    async setToCompleted(userId: number, todoId: number) {
        const user = await userRepository.findById(userId)
        user.todos.find(t => t.id === todoId)

        return await getManager().update(Todo, todoId, { isCompleted: true })
    }

    async getAllCompleted(userId: number) {
        const user = await userRepository.findById(userId)
        const todos = user.todos.find(t => t.isCompleted === true)

        return todos
    }
}

export default new todoRepository()