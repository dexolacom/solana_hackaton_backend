import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';
import { Token } from 'src/token/entities/token.entity';

@Entity({ name: 'project_tokens' })
export class ProjectToken {
  @PrimaryGeneratedColumn('uuid')
  projectTokenId: string;

  // @Column({ type: 'float' })
  // distribution: number;

  // @Column({ name: 'project_id' })
  // projectId: string;

  // @Column({ name: 'token_id' })
  // tokenId: string;

  @ManyToOne(() => Project, (project) => project.projectTokens)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;

  @ManyToOne(() => Token, (token) => token.projectTokens)
  @JoinColumn({ name: 'token_id', referencedColumnName: 'id' })
  token: Token;
}
