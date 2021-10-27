import bcrypt from 'bcrypt'
import { ICreateUserRequest } from '@modules/users/dtos/ICreateUserRequest'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = []

  async createUser({
    username,
    email,
    password,
  }: ICreateUserRequest): Promise<void> {
    const user = new User()
    const passwordHashed = await bcrypt.hash(password, 12)

    Object.assign(user, {
      username: username,
      email: email,
      password: passwordHashed,
    })

    this.users.push(user)
  }

  async findUserById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id)
    return user
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email)
    return user
  }
}

export { UserRepositoryInMemory }
