import { ICreateUserToken } from '@modules/users/dtos/ICreateUserToken'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

interface IUserTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserToken): Promise<UserTokens>

  findByUserIdAndRefreshTokens(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>

  deleteById(id: string): Promise<void>
}

export { IUserTokensRepository }