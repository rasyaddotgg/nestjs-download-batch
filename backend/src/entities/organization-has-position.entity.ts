import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'org_has_position',
})
export class OrgHasPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parent_ohp_id: number;

  @Column()
  organization_id: number;

  @Column()
  position_id: number;

  @Column()
  total_seat: number;

  @Column()
  level: number;

  @Column()
  available_seat: number;

  @Column()
  description: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  position_name: string;

  @Column()
  code: string;

  @Column()
  ojf_id: number;
}
