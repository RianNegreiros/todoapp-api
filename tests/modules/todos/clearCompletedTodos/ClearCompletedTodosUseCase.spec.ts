import { v4 as uuidV4 } from 'uuid'
import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { SetTodoStatusUseCase } from '@modules/todos/useCases/setTodoStatus/SetTodoStatusUseCase'
import { ClearCompletedTodosUseCase } from '@modules/todos/useCases/clearCompletedTodos/ClearCompletedTodosUseCase'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let clearCompletedTodosUseCase: ClearCompletedTodosUseCase
let setTodoStatusUseCase: SetTodoStatusUseCase
describe('Clear Completed Todos Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )

    clearCompletedTodosUseCase = new ClearCompletedTodosUseCase(
      userRepositoryInMemory,
      todoRepositoryInMemory
    )

    setTodoStatusUseCase = new SetTodoStatusUseCase(todoRepositoryInMemory)
  })

  it('Should be able to clear user completed todos', async () => {
    const userData: IRegisterUserRequest = {
      username: 'completedsTodos',
      email: 'completedsTodos@mail.com',
      password: 'compleTEDS123@',
      confirmPassword: 'compleTEDS123@',
    }
    await createUserUseCase.execute(userData)
    const user = await userRepositoryInMemory.findUserByEmail(userData.email)

    const createTodo = await createTodoUseCase.execute(user.id, 'new todo body')
    await setTodoStatusUseCase.execute(createTodo.id, true)

    await clearCompletedTodosUseCase.execute(user.id)
    const userTodos = await todoRepositoryInMemory.findCompletedTodos(user.id)
    expect(userTodos.length).toEqual(0)
  })
})
