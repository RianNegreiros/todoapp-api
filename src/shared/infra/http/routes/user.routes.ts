import { Router } from 'express'
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { GetUserAllTodosController } from '@modules/todos/useCases/getUserAllTodos/GetUserAllTodosController'
import { GetUserTodosCompletedController } from '@modules/todos/useCases/getUserTodosCompleted/GetUserTodosCompletedController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const getUserTodosCompletedController = new GetUserTodosCompletedController()
const getAllTodosController = new GetUserAllTodosController()

userRoutes.post('/register', createUserController.handle)

userRoutes.get('/alltodos', getAllTodosController.handle)

userRoutes.get('/todoscompleteds', getUserTodosCompletedController.handle)

export { userRoutes }
