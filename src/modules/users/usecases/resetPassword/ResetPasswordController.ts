import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ResetPasswordUseCase } from './ResetPasswordUseCase'

class ResetPasswordController {
  async handle(request: Request, ressponse: Response): Promise<Response> {
    const { token } = request.query
    const { password } = request.body
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)

    try {
      await resetPasswordUseCase.execute({ token: String(token), password })
      return ressponse.status(200).send()
    } catch (error) {
      return ressponse.status(400).json(error)
    }
  }
}

export { ResetPasswordController }
