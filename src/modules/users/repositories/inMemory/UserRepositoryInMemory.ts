import bcrypt from 'bcrypt'
import { ICreateUserRequest } from '@modules/users/dtos/ICreateUserRequest'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'

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

  async getAllUserTodos(id: string): Promise<Todo[]> {
    const user = this.users.filter((u) => u.id === id)
    return user[0].todos
  }

  async getUserCompletedTodos(id: string): Promise<Todo[]> {
    const user = this.users.filter((u) => u.id === id)
    return user[0].todos.filter((t) => t.isCompleted === true)
  }
}

export { UserRepositoryInMemory }
