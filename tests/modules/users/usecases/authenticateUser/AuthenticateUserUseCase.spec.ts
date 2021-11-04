import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { UserTokensRepositoryInMemory } from '@modules/users/repositories/inMemory/UserTokensRepositoryInMemory'

let userRepositoryInMemory: UserRepositoryInMemory
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory
let dateProvider: DateProvider

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeAll(() => {
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
      username: 'authUser',
      email: 'authUser@mail.com',
      password: 'authUSER123@',
      confirmPassword: 'authUSER123@',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
    expect(result).toHaveProperty('token')
  })

  it('Should not be able to authenticate if email is incorrect', () => {
    expect(async () => {
      const user: IRegisterUserRequest = {
        username: 'invalidEmail',
        email: 'emailInvalid@mail.com',
        password: 'invalidEMAIL123@',
        confirmPassword: 'invalidEMAIL123@',
      }
      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: 'invalid@mail.com',
        password: 'invalidEMAIL123@',
      })
    }).rejects.toThrow(new Error('Email or password incorrect'))
  })

  it('should not be able to authenticate if password is incorrect ', () => {
    expect(async () => {
      const user: IRegisterUserRequest = {
        username: 'invalidPassword',
        email: 'invalidPassword@mail.com',
        password: 'invPASSWORD123@',
        confirmPassword: 'invPASSWORD123@',
      }
      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: 'invalidPassword@mail.com',
        password: 'invalidPassword@',
      })
    }).rejects.toThrow(new Error('Email or password incorrect'))
  })
})
