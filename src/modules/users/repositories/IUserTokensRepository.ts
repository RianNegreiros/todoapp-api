import { ICreateUserToken } from '@modules/users/dtos/ICreateUserToken'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

interface IUserTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserToken): Promise<UserTokens>
}

export { IUserTokensRepository }
