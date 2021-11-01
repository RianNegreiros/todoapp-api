import { Router } from 'express'
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { GetAllTodosController } from '@modules/users/useCases/getAllTodos/GetAllTodosController'
import { GetTodosCompletedController } from '@modules/users/useCases/getTodosCompleted/GetTodosCompletedController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const getTodosCompletedController = new GetTodosCompletedController()
const getAllTodosController = new GetAllTodosController()

userRoutes.post('/register', createUserController.handle)

userRoutes.get('/alltodos', getAllTodosController.handle)

userRoutes.get('/todoscompleteds', getTodosCompletedController.handle)

export { userRoutes }
