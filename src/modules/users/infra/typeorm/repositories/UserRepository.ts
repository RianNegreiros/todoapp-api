import bcrypt from 'bcrypt'
import { getManager, getRepository, Repository } from 'typeorm'
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
