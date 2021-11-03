import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import auth from '@config/auth'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

interface IAuthRequest {
  email: string
  password: string
}

interface IAuthResponse {
  user: {
    username: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) {
      throw new Error('Email or password incorrect')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Email or password incorrect')
    }

    const token = sign({}, auth.jwt_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    })

    const refresh_token = sign({ email }, auth.refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.refresh_token_expires_date
    )

    await this.userTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token: refresh_token
    })

    const tokenReturn: IAuthResponse = {
      token,
      user: {
        username: user.username,
        email: user.email
      },
      refresh_token
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
