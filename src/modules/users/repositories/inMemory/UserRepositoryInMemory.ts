import bcrypt from 'bcrypt'
import { ICreateUserRequest } from '@modules/users/dtos/ICreateUserRequest'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { create } from 'domain'

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

  async findUserById(id: string): Promise<User> {
    const user = this.users.filter((user) => user.id === id)
    return user[0]
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.users.filter((user) => user.email === email)
    return user[0]
  }
}

export { UserRepositoryInMemory }
