import { Router } from 'express'
import { AuthenticateUserController } from '@/modules/users/usecases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from '@/modules/users/usecases/createUser/CreateUserController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

userRoutes.post('/register', createUserController.handle)
userRoutes.post('/login', authenticateUserController.handle)

export { userRoutes }
