import bcrypt from 'bcrypt'
import { ICreateUserRequest } from '@modules/users/dtos/ICreateUserRequest'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = []

  async createUser({
    username,
    email,
    password,
  }: ICreateUserRequest): Promise<void> {
    const user = new User()

    Object.assign(user, {
      username,
      email,
      password,
    })

    this.users.push(user)
  }

  async findUserById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    return user
  }
}

export { UserRepositoryInMemory }
