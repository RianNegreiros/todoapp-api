import { ICreateUserRequest } from '../dtos/ICreateUserRequest'
import { Todo } from '@modules/todos/infra/typeorm/entities/Todo'
import { User } from '../infra/typeorm/entities/User'

export interface IUserRepository {
  createUser(user: ICreateUserRequest): Promise<void>
  findUserById(id: string): Promise<User>
  findUserByEmail(email: string): Promise<User>
  getAllUserTodos(id: string): Promise<Todo[]>
  getUserCompletedTodos(id: string): Promise<Todo[]>
}
