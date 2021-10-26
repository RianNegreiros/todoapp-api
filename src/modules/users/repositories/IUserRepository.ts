import { ICreateUserRequest } from '../dtos/ICreateUserRequest'
import { User } from '../entities/User'

export interface IUserRepository {
  createUser(user: ICreateUserRequest): Promise<User>
  findUserById(id: string): Promise<User>
  findUserByEmail(email: string): Promise<User>
}
