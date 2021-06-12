import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  completed: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
