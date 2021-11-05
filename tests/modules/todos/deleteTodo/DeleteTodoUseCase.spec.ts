import { TodoRepositoryInMemory } from '@modules/todos/repositories/inMemory/TodoRepositoryInMemory'
import { CreateTodoUseCase } from '@modules/todos/useCases/createTodo/CreateTodoUseCase'
import { DeleteTodoUseCase } from '@modules/todos/useCases/deleteTodo/DeleteTodoUseCase'
import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'

let userRepositoryInMemory: UserRepositoryInMemory
let todoRepositoryInMemory: TodoRepositoryInMemory

let createUserUseCase: CreateUserUseCase
let createTodoUseCase: CreateTodoUseCase
let deleTodoUseCase: DeleteTodoUseCase
describe('Delete Todo Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    todoRepositoryInMemory = new TodoRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    createTodoUseCase = new CreateTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )
    deleTodoUseCase = new DeleteTodoUseCase(
      todoRepositoryInMemory,
      userRepositoryInMemory
    )
  })

  it('Should be able to delete a todo', async () => {
    const userData: IRegisterUserRequest = {
      username: 'createUser',
      email: 'createUser@mail.com',
      password: 'createUSER123@',
      confirmPassword: 'createUSER123@',
    }
    await createUserUseCase.execute(userData)
    const userCreated = await userRepositoryInMemory.findUserByEmail(
      userData.email
    )

    const todo = await createTodoUseCase.execute(userCreated.id, 'new todo body')
    await deleTodoUseCase.execute(userCreated.id, todo.id)

    const exists = await todoRepositoryInMemory.findTodoById(todo.id)

    expect(exists).toBeFalsy()
  })
})
