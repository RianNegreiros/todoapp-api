import request from 'supertest'
import { Connection, createConnection } from "typeorm"
import { app } from "@shared/infra/http/app"
import { IRegisterUserRequest } from "@modules/users/dtos/IRegisterUserRequest"
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRespository'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'

let userRepository: UserRepository
let userTokensRepository: UserTokensRepository
let createUserUseCase: CreateUserUseCase
let connection: Connection
describe('Refresh Token Controller', () => {
  beforeEach(() => {
    userRepository = new UserRepository()
    userTokensRepository = new UserTokensRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
  })
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 200 if user token refresh succeeds', async () => {
    const userData: IRegisterUserRequest = {
      username: 'authUser',
      email: 'authUser@mail.com',
      password: 'authUSER123@',
      confirmPassword: 'authUSER123@',
    }
    await request(app).post('/users/register').send({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    })

    const auth = await request(app).post('/authentication/sessions').send({
      email: userData.email,
      password: userData.password,
    })

    const response = await request(app).post('/authentication/refresh-token').send({
      token: auth.body.refresh_token
    })
    expect(response.status).toBe(200)
  })
})