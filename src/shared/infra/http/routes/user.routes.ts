import { Router } from 'express'
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { SendPasswordRecoveryMailController } from '@modules/users/useCases/sendPasswordRecoveryMail/SendPasswordRecoveryMailController'
import { ResetPasswordController } from '@modules/users/useCases/resetPassword/ResetPasswordController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const sendPasswordRecoveryMailController =
  new SendPasswordRecoveryMailController()
const resetPasswordController = new ResetPasswordController()

userRoutes.post('/register', createUserController.handle)
userRoutes.post('/password-recovery', sendPasswordRecoveryMailController.handle)
userRoutes.post('/reset-password', resetPasswordController.handle)

export { userRoutes }
