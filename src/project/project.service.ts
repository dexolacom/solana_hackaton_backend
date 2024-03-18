import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectToken } from './entities/projectToken.entity';
import { AddProjectDto } from './dto/add-project.dto';
import { TokenService } from 'src/token/token.service';
import { Token } from 'src/token/entities/token.entity';
import { RateService } from 'src/rate/rate.service';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectToken)
    private readonly projectTokenRepository: Repository<ProjectToken>,
    private readonly tokenService: TokenService,
    private readonly rateService: RateService,
  ) {}

  private async createProject(dto: CreateProjectDto) {
    return await this.projectRepository.save(dto);
  }

  private async createProjectToken(project: Project, token: Token) {
    return await this.projectTokenRepository.save({
      project,
      token,
    });
  }

  async findAll(request = {}) {
    return await this.projectRepository.find({
      where: request,
      // relations: { projectTokens: { token: true } },
    });
  }

  async findOne(request = {}) {
    return await this.projectRepository.findOne({
      where: request,
      relations: { projectTokens: { token: true } },
    });
  }

  async addProject(dto: AddProjectDto) {
    try {
      const { name, tokens } = dto;
      const isProjectInDB = await this.findOne({ name });
      if (isProjectInDB)
        throw new BadRequestException(
          `Project with name ${dto.name} is already in DB!`,
        );
      const project = await this.createProject({ name });
      for (const symbol of tokens) {
        const token = await this.tokenService.findOne({ symbol });
        await this.createProjectToken(project, token);
      }
      return {
        success: true,
        message: `Project with name ${name} successfully added!`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProjectTokens(id: string) {
    try {
      const project = await this.findOne({ id });
      const tokens = project.projectTokens.map((i) => i.token.symbol);
      const rateData = await this.rateService.getTokensInfo(tokens);
      const result = {
        name: project.name,
        tokens: project.projectTokens.map((i) => {
          const token = rateData[i.token.symbol].find(
            (item) => item.id == i.token.coinmarketcapId,
          );
          return {
            name: i.token.name,
            symbol: i.token.symbol,
            riskType: i.token.riskType,
            coinPrice: token.quote.USD.price,
            change24h: token.quote.USD.percent_change_24h,
            marketCap: token.quote.USD.market_cap,
          };
        }),
      };
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
