import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

@injectable()
class GetAllTodosUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findUserById(userId)
    if (!user) {
      throw new Error('User not found by this id')
    }
    return await this.userRepository.getAllUserTodos(userId)
  }
}

export { GetAllTodosUseCase }
