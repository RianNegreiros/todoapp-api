import { getRepository, Repository } from 'typeorm'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { ICreateUserRequest } from '@modules/users/dtos/ICreateUserRequest'
import { User } from '../entities/User'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async createUser({
    username,
    email,
    password,
  }: ICreateUserRequest): Promise<void> {
    const user = this.repository.create({
      username,
      email,
      password,
    })

    await this.repository.save(user)
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id })
    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }
}

export { UserRepository }
