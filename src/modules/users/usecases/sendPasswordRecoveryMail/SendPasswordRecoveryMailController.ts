import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { SendPasswordRecoveryMailUseCase } from './SendPasswordRecoveryMailUseCase'

class SendPasswordRecoveryMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    const sendPasswordRecoveryMailUseCase = container.resolve(
      SendPasswordRecoveryMailUseCase
    )

    try {
      await sendPasswordRecoveryMailUseCase.execute(email)
      return response.status(200).send()
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { SendPasswordRecoveryMailController }
