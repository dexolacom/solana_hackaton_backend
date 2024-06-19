import { EStatus } from 'src/@enums';
import { Project } from 'src/project/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'portfolios' })
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'portfolio_id' })
  portfolioId: number;

  @Column()
  amount: number;

  @Column({ nullable: true })
  burner: string;

  @Column({ type: 'jsonb', nullable: true })
  coinAmounts: {
    [key: string]: {
      amount: string;
      decimals: number;
      uiAmount: number;
    };
  };

  @Column({ default: EStatus.INIT })
  status: EStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at?: string;

  @ManyToOne(() => Project, (project) => project.portfolios)
  project: Project;
}
