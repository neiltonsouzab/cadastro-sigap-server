import IPage from '@shared/models/IPage';
import IPaginator from '@shared/models/IPaginator';
import ICreateUgRegistrationDTO from '../dtos/ICreateUgRegistrationDTO';
import UgRegistration from '../infra/typeorm/entities/UgRegistration';

export default interface IUgsRegistrationsRepository {
  create(data: ICreateUgRegistrationDTO): Promise<UgRegistration>;
  save(ugRegistration: UgRegistration): Promise<UgRegistration>;
  findById(id: number): Promise<UgRegistration | undefined>;
  findByUgAndStatus(
    ug_id: number,
    status: string,
  ): Promise<UgRegistration | undefined>;
  findByUgs(paginator: IPaginator<number[]>): Promise<IPage<UgRegistration>>;
}
