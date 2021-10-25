import { Router } from 'express'
import { AuthenticateUserController } from '../usecases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from '../usecases/createUser/CreateUserController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

userRoutes.post('/register', createUserController.handle)
userRoutes.get('/login', authenticateUserController.handle)

export { userRoutes }