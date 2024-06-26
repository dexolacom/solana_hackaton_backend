import { ProjectToken } from 'src/project/entities/projectToken.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Column({ name: 'coinmarketcap_id' })
  coinmarketcapId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at?: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at?: string;

  @OneToMany(() => ProjectToken, (projectToken) => projectToken.token)
  projectTokens: ProjectToken[];
}
