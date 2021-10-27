import bcrypt from 'bcrypt'
import { getRepository, Repository } from 'typeorm'
import { ICreateUserRequest } from '@modules/users/dtos/ICreateUserRequest'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUserRepository } from '../../../repositories/IUserRepository'

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
    const passwordHashed = await bcrypt.hash(password, 12)

    this.repository.create({
      username,
      email,
      password: passwordHashed,
    })
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.repository.findOneOrFail(id)
    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneOrFail({ email })
    return user
  }
}

export { UserRepository }
