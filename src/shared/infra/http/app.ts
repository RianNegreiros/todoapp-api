import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../../swagger.json'
import dbConnection from '@shared/infra/typeorm'
import { router } from '@shared/infra/http/routes'

import '@shared/container'

dbConnection()
const app = express()

app.use(express.json())
app.use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(cors())
app.use(router)

export { app }
