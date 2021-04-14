import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ugs')
class Ug {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  short_name: string;
}

export default Ug;
