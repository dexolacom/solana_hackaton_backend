import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'last_signatures' })
export class LastSignature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  signature: string;

  @Column()
  program: string;

  @Column()
  slot: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at?: string;
}
