import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { app } from '@shared/infra/http/app'

let connection: Connection
describe('Create user controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
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
    const response = await request(app).post('/users/register').send({
      username: 'registerUser',
      email: 'registerUser@mail.com',
      password: 'registerUSER123@',
      confirmPassword: 'registerUSER123@',
    })

    expect(response.status).toBe(400)
  })
})
