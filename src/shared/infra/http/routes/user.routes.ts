import { Router } from 'express'
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { SendPasswordRecoveryMailController } from '@modules/users/useCases/SendPasswrdRecoveryMail/SendPasswordRecoveryMailController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const sendPasswordRecoveryMailController =
  new SendPasswordRecoveryMailController()

userRoutes.post('/register', createUserController.handle)
userRoutes.post('/password-recovery', sendPasswordRecoveryMailController.handle)

export { userRoutes }
