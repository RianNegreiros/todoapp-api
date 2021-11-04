import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { UserTokensRepositoryInMemory } from '@modules/users/repositories/inMemory/UserTokensRepositoryInMemory'
import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase'
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase'
import { RefreshTokenUseCase } from '@modules/users/useCases/refreshToken/RefreshTokenUseCase'
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider'

let userRepositoryInMemory: UserRepositoryInMemory
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory
let dateProvider: DateProvider

let refreshTokenUseCase: RefreshTokenUseCase
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

describe('Refresh Token Use Case', () => {
  beforeEach(() => {
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory()
    dateProvider = new DateProvider()
    userRepositoryInMemory = new UserRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)

    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    )

    refreshTokenUseCase = new RefreshTokenUseCase(
      userTokensRepositoryInMemory,
      dateProvider
    )
  })

  it('Should be able to refresh user token', async () => {
    const user: IRegisterUserRequest = {
      username: 'authUser',
      email: 'authUser@mail.com',
      password: 'authUSER123@',
      confirmPassword: 'authUSER123@',
    }
    await createUserUseCase.execute(user)

    const auth = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
    const result = await refreshTokenUseCase.execute(auth.refresh_token)

    expect(result).toHaveProperty('refresh_token')
  })
})
