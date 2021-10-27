import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { todoRoutes } from './todo.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use('/users', userRoutes)
router.use('/todos', todoRoutes)
router.use('/authentication', authenticateRoutes)

export { router }
