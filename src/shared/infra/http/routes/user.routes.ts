import { Router } from 'express'
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { GetAllTodosController } from '@modules/users/useCases/getAllTodos/GetAllTodosController'
import { GetAllTodosCompletedController } from '@modules/users/useCases/getTodosCompleted/GeTodosCompletedController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const getAllTodosCompletedController = new GetAllTodosCompletedController()
const getAllTodosController = new GetAllTodosController()

userRoutes.post('/register', createUserController.handle)

userRoutes.get('/alltodos', getAllTodosController.handle)

userRoutes.get('/todoscompleteds', getAllTodosCompletedController.handle)

export { userRoutes }
