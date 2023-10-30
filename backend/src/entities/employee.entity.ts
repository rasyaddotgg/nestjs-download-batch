import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_dtm: Date;

  @Column()
  person_id: number;

  @Column({ type: 'int' })
  created_by: number;

  @Column()
  code: string;

  @Column({ type: 'int' })
  type_id: number;

  @Column({ type: 'int' })
  status_id: number;

  @Column()
  alt_code: string;

  @Column()
  ref_code: string;

  @Column()
  ref_alt_code: string;

  @Column()
  code_alternatif: string;
}
