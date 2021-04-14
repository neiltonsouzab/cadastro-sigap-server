import Ug from '@modules/ugs/infra/typeorm/entities/Ug';

class FakeUgsRepository implements FakeUgsRepository {
  private ugs: Ug[] = [];

  public async findAll(): Promise<Ug[]> {
    return this.ugs;
  }
}

export default FakeUgsRepository;
