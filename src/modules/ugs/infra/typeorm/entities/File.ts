import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import UgRegistration from './UgRegistration';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  original_name: string;

  @Column()
  content_type: string;

  @Column()
  size: number;

  @Column()
  from: string;

  @ManyToOne(() => UgRegistration, ug_registration => ug_registration.files)
  @JoinColumn({ name: 'ug_registration_id' })
  ug_registration: UgRegistration;

  @Expose({ name: 'url' })
  getUrl(): string {
    return `${process.env.APP_API_URL}/files/${this.name}`;
  }
}

export default File;
