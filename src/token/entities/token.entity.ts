import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column({ name: 'risk_type' })
  riskType: string;

  @Column({ type: 'float' })
  distribution: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at?: string;
}
