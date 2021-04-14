import IPage from '@shared/models/IPage';
import IPaginator from '@shared/models/IPaginator';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  find(paginator: IPaginator<string>): Promise<IPage<User>>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
