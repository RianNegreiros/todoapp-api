import bcrypt from 'bcrypt'
import { getManager, getRepository, Repository } from 'typeorm'
import { ICreateUserRequest } from '../dtos/ICreateUserRequest'
import { User } from '../entities/User'
import { IUserRepository } from './IUserRepository'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async createUser({ username, email, password }: ICreateUserRequest) {
    const passwordHashed = await bcrypt.hash(password, 12)

    const user = this.repository.create({
      username,
      email,
      password: passwordHashed,
    })
    return user
  }

  async findUserById(id: string) {
    const user = await getManager().findOneOrFail(User, id)
    return user
  }

  async findUserByEmail(email: string) {
    const user = await getRepository(User).findOneOrFail({ where: { email } })
    return user
  }
}

export { UserRepository }
