import { inject, injectable } from "tsyringe"
import { IUserRepository } from "../../repositories/IUserRepository"
import emailValidator from "../../validation/emailValidator"
import passwordValidator from "../../validation/passwordValidator"

interface IUserRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ username, email, password, confirmPassword }: IUserRequest) {
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
}

export { CreateUserUseCase }