import { IRegisterUserRequest } from '../../../../src/modules/users/dtos/IRegisterUserRequest'
import { AuthenticateUserUseCase } from '../../../../src/modules/users/usecases/authenticateUser/AuthenticateUserUseCase'
import { CreateUserUseCase } from '../../../../src/modules/users/usecases/createUser/CreateUserUseCase'
import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory'

let userRepositoryInMemory: UserRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it('Should be able to authenticate an user', async () => {
    const user: IRegisterUserRequest = {
      username: 'testNameExists',
      email: 'testexists@mail.com',
      password: 'testTEST123@',
      confirmPassword: 'testTEST123@',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })
})
