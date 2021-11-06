import { v4 as uuidV4 } from 'uuid'
import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { GetCompletedTodosUseCase } from '@modules/todos/useCases/getTodosCompleted/GetCompletedTodosUseCase'
import { SetTodoStatusUseCase } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusUseCase'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let getCompletedTodosUseCase: GetCompletedTodosUseCase
let setTodoStatusUseCase: SetTodoStatusUseCase
describe('Get Todos Completed Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )

    getCompletedTodosUseCase = new GetCompletedTodosUseCase(
      userRepositoryInMemory,
      todoRepositoryInMemory
    )

    setTodoStatusUseCase = new SetTodoStatusUseCase(todoRepositoryInMemory)
  })

  it('Should be able to return a list of completeds todos', async () => {
    const userData: IRegisterUserRequest = {
      username: 'completeds',
      email: 'completeds@mail.com',
      password: 'compleTEDS123@',
      confirmPassword: 'compleTEDS123@',
    }
    await createUserUseCase.execute(userData)
    const user = await userRepositoryInMemory.findUserByEmail(userData.email)

    const createTodo = await createTodoUseCase.execute(user.id, 'new todo body')
    await setTodoStatusUseCase.execute(createTodo.id, true)

    const completedTodos = await getCompletedTodosUseCase.execute(user.id)
    expect(completedTodos.length).toBeGreaterThan(0)
  })

  it('Should throws if user is not found', async () => {
    expect(async () => {
      const userId = uuidV4()
      await createTodoUseCase.execute(userId, 'new todo body')
      await getCompletedTodosUseCase.execute(userId)
    }).rejects.toThrow(new Error('User not found by this id'))
  })
})
