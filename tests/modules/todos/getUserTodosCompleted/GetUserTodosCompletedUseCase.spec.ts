import { v4 as uuidV4 } from 'uuid'
import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { GetUserTodosCompletedUseCase } from '@modules/todos/useCases/getUserTodosCompleted/GetUserTodosCompletedUseCase'
import { SetTodoStatusUseCase } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusUseCase'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let getUserTodosCompleted: GetUserTodosCompletedUseCase
let setTodoStatusUseCase: SetTodoStatusUseCase
describe('Get User Todos Completed Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )

    getUserTodosCompleted = new GetUserTodosCompletedUseCase(
      userRepositoryInMemory,
      todoRepositoryInMemory
    )

    setTodoStatusUseCase = new SetTodoStatusUseCase(todoRepositoryInMemory)
  })

  it('Should be able to return a list of user completeds todos', async () => {
    const userData: IRegisterUserRequest = {
      username: 'setStatus',
      email: 'setStatus@mail.com',
      password: 'setSTATUS123@',
      confirmPassword: 'setSTATUS123@',
    }
    await createUserUseCase.execute(userData)
    const user = await userRepositoryInMemory.findUserByEmail(userData.email)

    const createTodo = await createTodoUseCase.execute(user.id, 'new todo body')
    await setTodoStatusUseCase.execute(createTodo.id, true)
    
    const completedTodos = await getUserTodosCompleted.execute(user.id)
    expect(completedTodos.length).toBeGreaterThan(0)
  })

  it('Should throws if user is not found', async () => {
    expect(async () => {
      const userId = uuidV4()
      await createTodoUseCase.execute(userId, 'new todo body')
      await getUserTodosCompleted.execute(userId)
    }).rejects.toThrow(new Error('User not found by this id'))
  })
})
