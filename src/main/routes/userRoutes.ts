import { Router } from 'express'
import { login, register } from '../../controllers/userController'

const routes = Router()

routes.post('/register', register)
routes.get('/login', login)

export default routes