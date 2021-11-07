import { v4 as uuidV4 } from 'uuid'
import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { GetAllTodosUseCase } from '@modules/todos/useCases/getAllTodos/GetUserAllTodosUseCase'
import { CreateUserUseCase } from '@modules/users/usecases/createUser/CreateUserUseCase'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let getAllTodos: GetAllTodosUseCase
describe('Get All Todo Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )

    getAllTodos = new GetAllTodosUseCase(
      userRepositoryInMemory,
      todoRepositoryInMemory
    )
  })

  it('Should be able to return a list of todos', async () => {
    const userData: IRegisterUserRequest = {
      username: 'setStatus',
      email: 'setStatus@mail.com',
      password: 'setSTATUS123@',
      confirmPassword: 'setSTATUS123@',
    }
    await createUserUseCase.execute(userData)
    const user = await userRepositoryInMemory.findUserByEmail(userData.email)

    await createTodoUseCase.execute(user.id, 'new todo body')
    const todos = await getAllTodos.execute(user.id)

    expect(todos.length).toBeGreaterThan(0)
  })

  it('Should throws if user is not found', async () => {
    expect(async () => {
      const userId = uuidV4()
      await createTodoUseCase.execute(userId, 'new todo body')
      await getAllTodos.execute(userId)
    }).rejects.toThrow(new Error('User not found by this id'))
  })
})
