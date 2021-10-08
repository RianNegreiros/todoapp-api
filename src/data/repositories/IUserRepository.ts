import { User } from "../../entities/user";

export interface IUserRepository {
    createUser(username: string, email: string, password: string): Promise<User>
    findUserById(id: number): Promise<User>
    findUserByEmail(email: string): Promise<any>
    authenticateUser(password: string, userData: User): Promise<any>
}