import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { UserTokensRepositoryInMemory } from '@modules/users/repositories/inMemory/UserTokensRepositoryInMemory'

let userRepositoryInMemory: UserRepositoryInMemory
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let dateProvider: DateProvider

let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    dateProvider = new DateProvider()
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    )
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: IRegisterUserRequest = {
      username: 'testName',
      email: 'test@mail.com',
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

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'testexists@mail.com',
        password: 'testTEST123@',
      })
    }).rejects.toThrow(new Error('Email or password incorrect'))
  })

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: IRegisterUserRequest = {
        username: 'testName',
        email: 'test@mail.com',
        password: 'testTEST123@',
        confirmPassword: 'testTEST123@',
      }
      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: 'test@mail.com',
        password: 'invalid123@',
      })
    }).rejects.toThrow(new Error('Email or password incorrect'))
  })
})
