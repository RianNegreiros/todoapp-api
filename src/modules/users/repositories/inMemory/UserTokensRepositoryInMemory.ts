import { ICreateUserToken } from '@modules/users/dtos/ICreateUserToken'
import { UserTokens } from '@modules/users/infra/typeorm/entities/UserTokens'
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository'

class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private userTokens: UserTokens[] = []

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

  async findByUserIdAndRefreshTokens(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.userTokens.filter(
      (ut) => ut.user_id == user_id && ut.refresh_token && refresh_token
    )
    return userToken[0]
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.filter((ut) => ut.id === id)
    this.userTokens.splice(this.userTokens.indexOf(userToken[0]))
  }
}

export { UserTokensRepositoryInMemory }
