import { Router } from 'express'
import { SendPasswordRecoveryMailController } from '@modules/users/useCases/sendPasswordRecoveryMail/SendPasswordRecoveryMailController'
import { ResetPasswordController } from '@modules/users/useCases/resetPassword/ResetPasswordController'

const passwordRoutes = Router()

const sendPasswordRecoveryMailController =
  new SendPasswordRecoveryMailController()
const resetPasswordController = new ResetPasswordController()

passwordRoutes.post('/recovery', sendPasswordRecoveryMailController.handle)
passwordRoutes.post('/reset', resetPasswordController.handle)

export { passwordRoutes }
