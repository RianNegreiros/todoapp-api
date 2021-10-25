import jwt from 'jsonwebtoken'
import env from '../../config/env'
import bcrypt from 'bcrypt'
import { IUserRepository } from '../../data/repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'

interface IUAuthRequest {
  email: string
  password: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ email, password }: IUAuthRequest) {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) {
      throw new Error("User not found by this email")
    }

    const validate = await bcrypt.compare(password, user.password)
    if (!validate) {
      throw new Error("Fail to authenticate user")
    }

    const token = jwt.sign({ id: user.id }, env.jwtSecret, {
      expiresIn: '15m'
    })

    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: token
    }
    return data
  }
}

export { AuthenticateUserUseCase }