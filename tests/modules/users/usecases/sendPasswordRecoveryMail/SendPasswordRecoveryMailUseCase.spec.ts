import { UserRepositoryInMemory } from '@modules/users/repositories/inMemory/UserRepositoryInMemory'
import { UserTokensRepositoryInMemory } from '@modules/users/repositories/inMemory/UserTokensRepositoryInMemory'
import { SendPasswordRecoveryMailUseCase } from '@modules/users/useCases/sendPasswordRecoveryMail/SendPasswordRecoveryMailUseCase'
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
})
