import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import auth from '@config/auth'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProivder: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.refresh_token) as IPayload
    const user_id = sub

    const userTokens =
      await this.userTokensRepository.findByUserIdAndRefreshTokens(
        user_id,
        token
      )

    if (!userTokens) {
      throw new Error('Refresh Token Error')
    }

    await this.userTokensRepository.deleteById(userTokens.id)

    const expires_date = this.dateProivder.addDays(
      auth.refresh_token_expires_date
    )

    const refresh_token = sign({ email }, auth.refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    })

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    const newToken = sign({}, auth.jwt_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    })

    return {
      refresh_token,
      token: newToken,
    }
  }
}

export { RefreshTokenUseCase }
