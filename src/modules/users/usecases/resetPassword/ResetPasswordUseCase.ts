import { inject, injectable } from 'tsyringe'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { hash } from 'bcrypt'

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProivder')
    private dateProvider: IDateProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(token: string, password: string) {
    const userToken = await this.userTokensRepository.findByRefreshToken(token)
    if (!userToken) {
      throw new Error('Invalid token')
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new Error('Token expired')
    }

    const user = await this.userRepository.findUserById(userToken.user_id)
    user.password = await hash(password, 8)
    await this.userRepository.createUser(user)

    await this.userTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUseCase }
