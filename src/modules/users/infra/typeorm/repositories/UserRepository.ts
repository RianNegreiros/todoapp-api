import { getRepository, Repository } from 'typeorm'
import { ICreateUserRequest } from '@modules/users/dtos/ICreateUserRequest'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
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

    this.repository.create({
      username,
      email,
      password,
    })
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async getAllUserTodos(id: string): Promise<Todo[]> {
    const user = await this.repository.findOne(id)
    //return user.todos
    const todos: Todo[] = []
    return todos
  }

  async getUserCompletedTodos(id: string): Promise<Todo[]> {
    const user = await this.repository.findOne(id)
    //return user.todos.filter((t) => t.isCompleted === true)
    const todos: Todo[] = []
    return todos
  } 
}

export { UserRepository }
