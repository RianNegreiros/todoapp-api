import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { UserTokensRepositoryInMemory } from '@modules/users/repositories/inMemory/UserTokensRepositoryInMemory'
import { SendPasswordRecoveryMailUseCase } from '@modules/users/usecases/sendPasswordRecoveryMail/SendPasswordRecoveryMailUseCase'
import { DateProvider } from '@shared/container/providers/DateProvider/DateProvider'
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/inMemory/MailProviderInMemory'

let sendPasswordRecoveryMailUseCase: SendPasswordRecoveryMailUseCase
let userRepositoryInMemory: UserRepositoryInMemory
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory
let dateProvider: DateProvider
let mailProvider: MailProviderInMemory
describe('Send Password Recovery Mail Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory()
    dateProvider = new DateProvider()
    mailProvider = new MailProviderInMemory()

    sendPasswordRecoveryMailUseCase = new SendPasswordRecoveryMailUseCase(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('Should be able to send an email to user password recovery', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await userRepositoryInMemory.createUser({
      username: 'passwordRecovery',
      email: 'passwordRecovery@mail.com',
      password: 'recoVERY123@',
    })
    await sendPasswordRecoveryMailUseCase.execute('passwordRecovery@mail.com')
    expect(sendMail).toHaveBeenCalled()
  })

  it('Should be able to create an user token', async () => {
    const generateToken = jest.spyOn(userTokensRepositoryInMemory, 'create')
    await userRepositoryInMemory.createUser({
      username: 'passwordRecovery',
      email: 'passwordRecovery@mail.com',
      password: 'recoVERY123@',
    })
    await sendPasswordRecoveryMailUseCase.execute('passwordRecovery@mail.com')
    expect(generateToken).toHaveBeenCalled()
  })

  it('Should not be able to send an email if user does not exists', async () => {
    expect(async () => {
      await sendPasswordRecoveryMailUseCase.execute('passwordRecovery@mail.com')
    }).rejects.toThrow(new Error('User not found by this email'))
  })
})
