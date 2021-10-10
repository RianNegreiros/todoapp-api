import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

class UserController {
  constructor(private userService: UserService) { }

  async register(request: Request, response: Response) {
    const { username, email, password, confirmPassword } = request.body

    try {
      const user = await this.userService.createUser({ username, email, password, confirmPassword });
      return response.json(user).status(201)
    } catch (error) {
      return response.status(400).json(error)
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body

    try {
      const user = await this.userService.authenticateUser({ email, password })
      return response.json(user).status(200)
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { UserController }