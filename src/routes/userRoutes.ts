import { Router } from 'express'
import { createUserFactory } from '../factories/CreateUserFactory'

const userRoutes = Router()

userRoutes.post('/register', createUserFactory().register)
userRoutes.get('/login', createUserFactory().login)

export default userRoutes