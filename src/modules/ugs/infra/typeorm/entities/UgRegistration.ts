import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import File from './File';
import Ug from './Ug';

@Entity('ugs_registrations')
class UgRegistration {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  code: string;

  @Column()
  cnpj: string;

  @Column()
  name: string;

  @Column()
  fantasy_name: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  cep: string;

  @Column()
  complement: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  site: string;

  @Column()
  short_name: string;

  @Column()
  open_date: Date;

  @Column()
  legal_nature_code: string;

  @Column()
  obs: string;

  @Column()
  type: string;

  @Column()
  expense_ordinator_cpf: string;

  @Column()
  expense_ordinator_name: string;

  @Column()
  expense_ordinator_email: string;

  @Column()
  status: string;

  @Column()
  status_justification: string;

  @Column()
  user_id: number;

  @Column()
  user_update_id: number;

  @Column()
  ug_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_update_id' })
  user_update: User;

  @ManyToOne(() => Ug)
  @JoinColumn({ name: 'ug_id' })
  ug: Ug;

  @OneToMany(() => File, file => file.ug_registration, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'ug_registration_id' })
  files: File[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UgRegistration;
