import { IUserRepository } from "../data/repositories/IUserRepository"
import emailValidator from "../validation/emailValidator"
import passwordValidator from "../validation/passwordValidator"
import jwt from 'jsonwebtoken'
import env from '../../src/config/env'
import bcrypt from 'bcrypt'

interface IUserRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface IUAuthRequest {
  email: string
  password: string
}

class UserService {
  constructor(private userRepository: IUserRepository) { }

  async createUser({ username, email, password, confirmPassword }: IUserRequest) {
    if (passwordValidator.isValid(password) === false || passwordValidator.isValid(confirmPassword) === false) {
      throw new Error("Password does not match requirements")
    }

    if (emailValidator.isValid(email) === false) {
      throw new Error("Invalid email")
    }

    if (await this.userRepository.findUserByEmail(email)) {
      throw new Error("This email is already in use")
    }

    const newUser = this.userRepository.createUser({ username, email, password })

    return newUser
  }

  async authenticateUser({email, password}: IUAuthRequest) {
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

export { UserService }