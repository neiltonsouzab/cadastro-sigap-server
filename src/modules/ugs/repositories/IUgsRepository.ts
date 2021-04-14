import Ug from '../infra/typeorm/entities/Ug';

export default interface IUgsRepository {
  findAll(): Promise<Ug[]>;
}
