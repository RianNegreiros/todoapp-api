import { IRegisterUserRequest } from '@modules/users/dtos/IRegisterUserRequest'
import { CreateUserUseCase } from '@modules/users/usecases/createUser/CreateUserUseCase'
import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'

let userRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it('Should be able to create a new user', async () => {
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

    expect(userCreated).toHaveProperty('id')
  })

  it('Should throw if user already exists', async () => {
    const userData: IRegisterUserRequest = {
      username: 'createUser',
      email: 'createUser@mail.com',
      password: 'createUSER123@',
      confirmPassword: 'createUSER123@',
    }

    await createUserUseCase.execute(userData)

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      new Error('This email is already in use')
    )
  })

  it('Should throw if password does not match the requirements', async () => {
    expect(async () => {
      const userData: IRegisterUserRequest = {
        username: 'invalidPassword',
        email: 'invalidpassword@mail.com',
        password: 'invalidPassword',
        confirmPassword: 'invalidPassword',
      }
      await createUserUseCase.execute(userData)
    }).rejects.toThrow(new Error('Password does not match requirements'))
  })

  it('Should throw if email is invalid', async () => {
    expect(async () => {
      const userData: IRegisterUserRequest = {
        username: 'invalidEmail',
        email: 'invalidemail',
        password: 'invalidEMAIL123@',
        confirmPassword: 'invalidEMAIL123@',
      }
      await createUserUseCase.execute(userData)
    }).rejects.toThrow(new Error('Invalid email'))
  })
})
