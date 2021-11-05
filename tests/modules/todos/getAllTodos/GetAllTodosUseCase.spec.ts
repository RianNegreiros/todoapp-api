import { v4 as uuidV4 } from 'uuid'
import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { GetUserAllTodosUseCase } from '@modules/todos/useCases/getUserAllTodos/GetUserAllTodosUseCase'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let getUserAllTodos: GetUserAllTodosUseCase
describe('Get All User Todo Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )

    getUserAllTodos = new GetUserAllTodosUseCase(
      userRepositoryInMemory,
      todoRepositoryInMemory
    )
  })

  it('Should be able to return a list of user todos', async () => {
    const userData: IRegisterUserRequest = {
      username: 'setStatus',
      email: 'setStatus@mail.com',
      password: 'setSTATUS123@',
      confirmPassword: 'setSTATUS123@',
    }
    await createUserUseCase.execute(userData)
    const user = await userRepositoryInMemory.findUserByEmail(userData.email)

    await createTodoUseCase.execute(user.id, 'new todo body')
    const todos = await getUserAllTodos.execute(user.id)

    expect(todos.length).toBeGreaterThan(0)
  })

  it('Should throws if user is not found', async () => {
    expect(async () => {
      const userId = uuidV4()
      await createTodoUseCase.execute(userId, 'new todo body')
      await getUserAllTodos.execute(userId)
    }).rejects.toThrow(new Error('User not found by this id'))
  })
})
