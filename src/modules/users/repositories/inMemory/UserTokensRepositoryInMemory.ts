import { ICreateUserToken } from '@modules/users/dtos/ICreateUserToken'
import { UserTokens } from '@modules/users/infra/typeorm/entities/UserTokens'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private userTokens: UserTokens[]

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserToken): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    })

    this.userTokens.push(userToken)
    return userToken
  }
}

export { UserTokensRepositoryInMemory }
