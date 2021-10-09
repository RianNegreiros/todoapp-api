import { User } from "../../src/entities/User"
import { v4 as uuid } from "uuid"
import { IUserRepository } from "../../src/data/repositories/IUserRepository"
import bcrypt from 'bcrypt'


class UserRepositoryInMemory implements IUserRepository {
    private users: User[] = []

    async createUser({username, email, password}: User): Promise<User> {
        const passwordHashed = await bcrypt.hash(password, 12)

        const user = {
            username: username,
            email: email,
            password: passwordHashed
        }

        Object.assign(user, {
            id: uuid
        })

        this.users.push(user)

        return user
    }

    async findUserById(id: number): Promise<any> {
        const user = this.users.find(user => user.id === id)
        return user
    }

    async findUserByEmail(email: string): Promise<any> {
        const user = this.users.find(user => user.email === email)
        return user
    }
}

export { UserRepositoryInMemory }