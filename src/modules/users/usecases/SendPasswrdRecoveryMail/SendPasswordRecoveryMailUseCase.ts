import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { sign } from 'jsonwebtoken'
import auth from '@config/auth'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'

@injectable()
class SendPasswordRecoveryMailUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string) {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) {
      throw new Error('User not found by this id')
    }
    const refresh_token = sign({ email }, auth.refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    })
    const expires_date = this.dateProvider.addHours(3)
    await this.userTokensRepository.create({
      refresh_token,
      user_id: user.id,
      expires_date,
    })

    await this.mailProvider.sendMail(
      email,
      'Password recovery',
      `Link: ${refresh_token}`
    )
  }
}

export { SendPasswordRecoveryMailUseCase }
