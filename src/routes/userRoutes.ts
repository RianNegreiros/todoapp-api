import { Router } from 'express'
import { createUserFactory } from '../factories/createUserFactory'

const userRoutes = Router()

userRoutes.post('/register', createUserFactory().register)
userRoutes.get('/login', createUserFactory().login)

export default userRoutes