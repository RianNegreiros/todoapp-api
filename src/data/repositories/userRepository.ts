import bcrypt from 'bcrypt'
import { getManager, getRepository } from 'typeorm'
import { User } from '../../entities/User'
import { IUserRepository } from './IUserRepository'

class UserRepository implements IUserRepository {
  async createUser({ username, email, password }: User) {
    const passwordHashed = await bcrypt.hash(password, 12)

    const user = await getRepository(User).save({
      username,
      email,
      password: passwordHashed
    })

    return user
  }

  async findUserById(id: number) {
    const user = await getManager().findOneOrFail(User, id)
    return user
  }

  async findUserByEmail(email: string) {
    const user = await getRepository(User).findOneOrFail({ where: { email } })
    return user
  }
}

export { UserRepository }