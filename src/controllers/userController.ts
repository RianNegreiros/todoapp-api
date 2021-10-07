import { Request, Response } from 'express'
import userService from '../services/userService'

export const register = async (request: Request, response: Response) => {
  const { username, email, password, confirmPassword } = request.body

  const user = await userService.saveUser({ username, email, password, confirmPassword });

  return response.json(user).status(201)
}

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body

  const user = await userService.authenticateUser({email, password})

  return response.json(user).status(200)
}