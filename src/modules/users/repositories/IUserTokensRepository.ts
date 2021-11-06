import { ICreateUserToken } from '@modules/users/dtos/ICreateUserToken'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

interface IUserTokensRepository {
  create({
    refresh_token,
    user_id,
    expires_date,
  }: ICreateUserToken): Promise<UserTokens>

  findByUserIdAndRefreshTokens(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>

  deleteById(id: string): Promise<void>

  findByRefreshToken(refreshToken: string): Promise<UserTokens>
}

export { IUserTokensRepository }
