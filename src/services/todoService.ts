import todoRepository from "../data/repositories/todoRepository"

interface ICreateTodoRequest {
    userId: number
    body: string
}

interface ITodoRequest {
    userId: number
    todoId: number
}

class todoService {

    async addTodo({userId, body}: ICreateTodoRequest) {
        return await todoRepository.addTodo(body, false, userId)
    }

    async setCompleted({userId, todoId}: ITodoRequest) {
        return await todoRepository.setToCompleted(userId, todoId)
    }

    async deleteTodo({userId, todoId}: ITodoRequest) {
        return await todoRepository.deleteTodo(userId, todoId)
    }

    async getAll({userId}: ITodoRequest) {
        return await todoRepository.getAllTodos(userId)
    }

    async getAllCompletedTodos({userId}: ITodoRequest) {
        return await todoRepository.getAllCompleted(userId)
    }
}

export default new todoService()