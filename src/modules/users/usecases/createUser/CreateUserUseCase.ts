import { inject, injectable } from 'tsyringe'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { IUserRepository } from '@modules/users/infra/typeorm/repositories/IUserRepository'
import emailValidator from '@modules/users/validation/emailValidator'
import passwordValidator from '@modules/users/validation/passwordValidator'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    username,
    email,
    password,
    confirmPassword,
  }: IRegisterUserRequest) {
    if (
      passwordValidator.isValid(password) === false ||
      passwordValidator.isValid(confirmPassword) === false
    ) {
      throw new Error('Password does not match requirements')
    }

    if (emailValidator.isValid(email) === false) {
      throw new Error('Invalid email')
    }

    if (await this.userRepository.findUserByEmail(email)) {
      throw new Error('This email is already in use')
    }

    const newUser = this.userRepository.createUser({
      username,
      email,
      password,
    })

    return newUser
  }
}

export { CreateUserUseCase }
