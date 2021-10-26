import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger.json'
import { dbConnection } from './data/database/dbConnection'
import { router } from './shared/http/routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)

dbConnection()

export { app }
