import { Connection, createConnection } from 'typeorm'
import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'

let connection: Connection
describe('Authenticate user controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 200 if user authentication succeeds', async () => {
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

    const response = await request(app).post('/authentication/sessions').send({
      email: userData.email,
      password: userData.password,
    })
    expect(response.status).toBe(200)
  })

  it('Should return 400 if user authentication fails', async () => {
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

    const response = await request(app).post('/authentication/sessions').send({
      email: 'invalidAuth',
      password: 'invalidAuth',
    })
    expect(response.status).toBe(400)
  })
})
