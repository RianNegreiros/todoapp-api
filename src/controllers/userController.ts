import { Request, Response } from 'express'
import userService from '../services/userService'

export const register = async (request: Request, response: Response) => {
  const { username, email, password, confirmPassword } = request.body

  try {
    const user = await userService.saveUser({ username, email, password, confirmPassword });
    return response.json(user).status(201)
  } catch (error) {
    return response.status(400).json(error)
  }
}

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body

  try {
    const user = await userService.authenticateUser({ email, password })
    return response.json(user).status(200)
  } catch (error) {
    return response.status(400).json(error)
  }
}