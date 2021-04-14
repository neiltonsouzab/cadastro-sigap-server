import { v4 as uuidv4 } from 'uuid';

import UserToken from '../../infra/typeorm/entities/UserToken';
import IUsersTokensRepository from '../IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  public async create(user_id: number): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: this.usersTokens.length + 1,
      token: uuidv4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = this.usersTokens.find(
      findUserToken => findUserToken.token === token,
    );

    return findToken;
  }
}

export default FakeUsersTokensRepository;
