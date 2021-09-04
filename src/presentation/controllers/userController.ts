import { Request, Response } from 'express'
import userRepository from '../../data/repositories/userRepository'
import emailValidator from '../../validation/emailValidator'
import passwordValidation from '../../validation/passwordValidation'

export const register = async (request: Request, response: Response) => {
  const { username, email, password, confirmPassword } = request.body

  if (passwordValidation.isValid(password, confirmPassword) === false) {
    return response.status(400).json({ error: 'Password does not match requirements or confirmation password' })
  }

  if (emailValidator.isValid(email) === false) {
    return response.status(400).json({ error: 'Invalid email.' })
  }

  if(await userRepository.userExist(email)) {
    return response.status(400).json({ error: 'This email is already in use.' })
  }

  const user = userRepository.addUser(username, email, password)

  return response.json(user).status(201)
}

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body

  const user = await userRepository.userExist(email)

  if (user) {
    userRepository.authenticateUser(password, user)
    return response.status(200)
  }

  return response.status(404).json({ error: 'User not found.' })
}