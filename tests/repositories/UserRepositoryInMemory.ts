import { User } from "../../src/entities/User"
import { v4 as uuid } from "uuid"
import { IUserRepository } from "../../src/data/repositories/IUserRepository"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../../src/config/env'

class UserRepositoryInMemory implements IUserRepository {
    private users: User[] = []

    async createUser(user: User): Promise<User> {
        Object.assign(user, {
            id: uuid
        });

        this.users.push(user)

        return user
    }

    async findUserById(id: number): Promise<any> {
        const user = this.users.some((user) => user.id === id)
        return user
    }

    async findUserByEmail(email: string): Promise<any> {
        const user = this.users.some((user) => user.email === email)
        return user
    }
    async authenticateUser(password: string, userData: User): Promise<any> {
        if (await bcrypt.compare(password, userData.password)) {
            const token = jwt.sign({ id: userData.id }, env.jwtSecret, {
              expiresIn: '15m'
            })
      
            const data = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              token
            }
      
            return data
          }
    }
}

export { UserRepositoryInMemory }