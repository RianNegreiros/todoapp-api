import { ICreateUserRequest } from '@/modules/users/dtos/ICreateUserRequest'
import { User } from '@/modules/users/entities/User'

export interface IUserRepository {
  createUser(user: ICreateUserRequest): Promise<void>
  findUserById(id: string): Promise<User | undefined>
  findUserByEmail(email: string): Promise<User | undefined>
}
