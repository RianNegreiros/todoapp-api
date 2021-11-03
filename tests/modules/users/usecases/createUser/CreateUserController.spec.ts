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

  it('be able to create a new user', async () => {
    const response = await request(app).post('/users/register').send({
      username: 'testName',
      email: 'test@mail.com',
      password: 'testTEST123@',
      confirmPassword: 'testTEST123@',
    })

    expect(response.status).toBe(201)
  })
})
