import { Connection, createConnection } from 'typeorm'
import request from 'supertest'
import { hash } from 'bcrypt'
import {v4 as uuidV4} from 'uuid'
import { app } from '@shared/infra/http/app'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRespository'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'

let userRepository: UserRepository
let userTokensRepository: UserTokensRepository
let createUserUseCase: CreateUserUseCase
let connection: Connection
describe('Refresh Token Controller', () => {
  beforeEach(() => {
    userTokensRepository = new UserTokensRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
  })
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('refreshTOKEN123@', 8)
    await connection.query(
      `INSERT INTO USERS(id, username, email, password, created_at)
      values('${id}', 'refreshToken', 'refreshToken@mail.com', '${password}', 'now()')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 200 if user token refresh succeeds', async () => {
    const authResponse = await request(app).post('/authentication/sessions').send({
      email: 'refreshToken@mail.com',
      password: 'refreshTOKEN123@'
    })

    const { refresh_token } = authResponse.body

    const response = await request(app)
      .post('/authentication/refresh-token')
      .send({
        token: refresh_token,
      })
    expect(response.status).toBe(200)
  })
})
