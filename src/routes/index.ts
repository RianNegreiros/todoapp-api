import { Router } from 'express'
import { todoRoutes } from './todo.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use('/users', userRoutes)
router.use('/todos', todoRoutes)

export { router }
