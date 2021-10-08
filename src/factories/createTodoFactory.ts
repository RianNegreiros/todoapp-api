import { TodoController } from "../controllers/TodoController"
import { TodoRepository } from "../data/repositories/TodoRepository"
import { UserRepository } from "../data/repositories/UserRepository"
import { TodoService } from "../services/TodoService"

export const createTodoFactory = () => {
    const userRepository =  new UserRepository()
    
    const todoRepository = new TodoRepository(userRepository)
    const todoService = new TodoService(todoRepository)
    const userController = new TodoController(todoService)

    return userController
}