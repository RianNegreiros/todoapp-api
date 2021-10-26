import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/users/infra/typeorm/repositories/IUserRepository'
import env from '@config/env'

interface IAuthRequest {
  email: string
  password: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IAuthRequest) {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) {
      throw new Error('Email or password incorrect')
    }

    const validate = await bcrypt.compare(password, user.password)
    if (!validate) {
      throw new Error('Email or password incorrect')
    }

    const token = jwt.sign({ username: user.username }, env.jwtSecret, {
      subject: user.id,
      expiresIn: '15m',
    })
    return {
      username: user.username,
      email: user.email,
      token: token,
    }
  }
}

export { AuthenticateUserUseCase }
