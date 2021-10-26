import { ICreateUserRequest } from '../dtos/ICreateUserRequest'
import { User } from '../entities/User'

export interface IUserRepository {
  createUser(user: ICreateUserRequest): Promise<void>
  findUserById(id: string): Promise<User | undefined>
  findUserByEmail(email: string): Promise<User | undefined>
}
