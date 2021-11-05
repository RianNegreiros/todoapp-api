import request from 'supertest'
import { hash } from 'bcrypt'
import { Connection, createConnection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { app } from '@shared/infra/http/app'
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository'
import { TodoRepository } from '@modules/todos/infra/typeorm/repositories/TodoRepository'

let userRepository: UserRepository
let todoRepository: TodoRepository
let connection: Connection
describe('Set Todo Status Controller', () => {
  beforeEach(() => {
    userRepository = new UserRepository()
    todoRepository = new TodoRepository()
  })

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const userId = uuidV4()
    const password = await hash('setTodoSTATUS123@', 8)
    await connection.query(
      `INSERT INTO USERS(id, username, email, password, created_at)
      values('${userId}', 'setTodoStatus', 'setTodoStatus@mail.com', '${password}', 'now()')`
    )

    const todoId = uuidV4()
    await connection.query(
      `INSERT INTO TODOS(id, user_id, body, completed, created_at, updated_at)
      values('${todoId}', '${userId}', 'new todo body', 'false', 'now()', 'now()')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should return 200 if todo change of status succeeds', async () => {
    const auth = await request(app).post('/authentication/sessions').send({
      email: 'setTodoStatus@mail.com',
      password: 'setTodoSTATUS123@',
    })
    const user = await userRepository.findUserByEmail('setTodoStatus@mail.com')

    const todo = await todoRepository.findTodosByUser(user.id)
    const { token } = auth.body
    const response = await request(app)
      .put('/todos/status')
      .send({
        todoId: todo[0].id,
        status: true,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(response.status).toBe(200)
  })
})
