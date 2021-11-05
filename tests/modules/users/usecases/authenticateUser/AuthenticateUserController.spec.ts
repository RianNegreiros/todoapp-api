import { Connection, createConnection } from 'typeorm'
import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { hash } from 'bcrypt'
import {v4 as uuidV4} from 'uuid'

let connection: Connection
describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('authUSER123@', 8)
    await connection.query(
      `INSERT INTO USERS(id, username, email, password, created_at)
      values('${id}', 'authUser', 'authUser@mail.com', '${password}', 'now()')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 200 if user authentication succeeds', async () => {
    const response = await request(app).post('/authentication/sessions').send({
      email: 'authUser@mail.com',
      password: 'authUSER123@',
    })
    expect(response.status).toBe(200)
  })

  it('Should return 400 if user authentication fails', async () => {
    const response = await request(app).post('/authentication/sessions').send({
      email: 'invalidAuth',
      password: 'invalidAuth',
    })
    expect(response.status).toBe(400)
  })
})
