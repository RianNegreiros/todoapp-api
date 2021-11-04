import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { app } from '@shared/infra/http/app'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'

let connection: Connection
describe('Create user controller', () => {
  beforeEach(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterEach(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 201 if user registration succeeds', async () => {
    const response = await request(app).post('/users/register').send({
      username: 'registerUser',
      email: 'registerUser@mail.com',
      password: 'registerUSER123@',
      confirmPassword: 'registerUSER123@',
    })

    expect(response.status).toBe(201)
  })

  it('Should return 400 if user registration fails', async () => {
    const userData: IRegisterUserRequest = {
      username: 'registerUser',
      email: 'registerUser@mail.com',
      password: 'registerUSER123@',
      confirmPassword: 'registerUSER123@',
    }
    await request(app).post('/users/register').send({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    })

    const response = await request(app).post('/users/register').send({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    })

    expect(response.status).toBe(400)
  })
})
