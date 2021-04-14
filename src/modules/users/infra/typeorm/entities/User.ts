import Ug from '@modules/ugs/infra/typeorm/entities/Ug';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cpf: string;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  type: string;

  @Column()
  enabled: boolean;

  @Column()
  blocked: boolean;

  @ManyToMany(() => Ug)
  @JoinTable({
    name: 'users_ugs',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'ug_id' },
  })
  ugs: Ug[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
