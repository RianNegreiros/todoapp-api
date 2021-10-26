import { IRegisterUserRequest } from '../../../../../src/modules/users/dtos/IRegisterUserRequest'
import { IUserRepository } from '../../../../../src/modules/users/repositories/IUserRepository'
import { CreateUserUseCase } from '../../../../../src/modules/users/usecases/createUser/CreateUserUseCase'
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory'

let userRepositoryInMemory: IUserRepository
let createUserUseCase: CreateUserUseCase
describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it('Should be able to create a new user', async () => {
    const userData: IRegisterUserRequest = {
      username: 'testName',
      email: 'test@mail.com',
      password: 'testTEST123@',
      confirmPassword: 'testTEST123@',
    }

    await createUserUseCase.execute(userData)

    const userCreated = await userRepositoryInMemory.findUserByEmail(
      userData.email
    )

    expect(userCreated).toHaveProperty('id')
  })

  it('Should throw if user already exists', async () => {
    const userData: IRegisterUserRequest = {
      username: 'testNameExists',
      email: 'testexists@mail.com',
      password: 'testTEST123@',
      confirmPassword: 'testTEST123@',
    }

    await createUserUseCase.execute(userData)

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      new Error('This email is already in use')
    )
  })

  it('Should throw if password does not match the requirements', async () => {
    const userData: IRegisterUserRequest = {
      username: 'testInvalidPassword',
      email: 'testinvalidpassword@mail.com',
      password: 'invalidPassword',
      confirmPassword: 'invalidPassword',
    }

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      new Error('Password does not match requirements')
    )
  })

  it('Should throw if email is invalid', async () => {
    const userData: IRegisterUserRequest = {
      username: 'testInvalidEmail',
      email: 'testinvalidemail',
      password: 'testTEST123@',
      confirmPassword: 'testTEST123@',
    }

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      new Error('Invalid email')
    )
  })
})
