import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
  create(user_id: number): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
