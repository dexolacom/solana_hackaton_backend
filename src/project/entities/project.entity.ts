import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectToken } from './projectToken.entity';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'collection_id' })
  collectionId: number;

  @Column({ name: 'total_amount', default: 0, type: 'float' })
  totalAmount: number;

  @Column()
  name: string;

  @Column({ name: 'is_active', default: false })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at?: string;

  @OneToMany(() => ProjectToken, (projectToken) => projectToken.project)
  projectTokens: ProjectToken[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.project)
  portfolios: Portfolio[];
}
