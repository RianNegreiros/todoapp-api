import { Router } from 'express'
import { login, register } from '../controllers/userController'

const userRoutes = Router()

userRoutes.post('/register', register)
userRoutes.get('/login', login)

export default userRoutes