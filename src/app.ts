import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import todoRoutes from './routes/todo.routes'
import userRoutes from './routes/user.routes'
import swaggerFile from '../swagger.json'
import { dbConnection } from './data/database/dbConnection'

export const app = express()

app.use(cors())
app.use(express.json())
app.use("api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(userRoutes)
app.use(todoRoutes)

dbConnection()

export default app