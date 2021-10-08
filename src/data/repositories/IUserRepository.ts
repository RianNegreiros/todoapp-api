import { User } from "../../entities/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>
    findUserById(id: number): Promise<User>
    findUserByEmail(email: string): Promise<User[]>
    authenticateUser(password: string, userData: User): Promise<any>
}