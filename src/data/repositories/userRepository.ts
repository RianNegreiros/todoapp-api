import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../../main/config/env'
import { getManager, getRepository } from 'typeorm'
import { User } from '../../domain/models/user'

class userRepository {
  async findById (id: number) {
    const user = await getManager().findOneOrFail(User, id)

    return user
  }

  async findUserByEmail (email: string) {
    const user = await getRepository(User).findOne({ where: { email } })
    return user
  }

  async addUser (username: string, email: string, password: string) {    
    const passwordHash = await bcrypt.hash(password, 12)
    
    const user = await getRepository(User).save({
      username,
      email,
      password: passwordHash
    })
  
    return user
  }

  async authenticateUser(password: string, userData: User) {
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

export default new userRepository()