import { app } from '@shared/infra/http/app'
import request from 'supertest'

describe("Create user controller", () => {
  it("be able to create a new user", async () => {
    const  response = await request(app).post("users/register").send({
      username: 'testName',
      email: 'test@mail.com',
      password: 'testTEST123@',
      confirmPassword: 'testTEST123@',
    })

    expect(response.status).toBe(201)
  })
})