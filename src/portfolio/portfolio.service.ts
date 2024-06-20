import { Injectable, Logger } from '@nestjs/common';
import {
  CreatePortfolioDto,
  UpdatePortfolioDto,
} from './dto/create-portfolio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  private readonly logger = new Logger(PortfolioService.name);

  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(dto: CreatePortfolioDto) {
    this.logger.log('Creating a new portfolio');

    const portfolio = this.portfolioRepository.create(dto);
    await this.portfolioRepository.save(portfolio);
    return portfolio;
  }

  async findAll() {
    return await this.portfolioRepository.find();
  }

  async findOne(id: string) {
    return await this.portfolioRepository.findOne({ where: { id } });
  }

  async findOneByProject(id: number, projectId: string) {
    return await this.portfolioRepository.findOne({
      where: { portfolioId: id, project: { id: projectId } },
      relations: ['project'],
    });
  }

  async update(
    collectionId: number,
    portfolioId: number,
    dto: UpdatePortfolioDto,
  ) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { portfolioId, project: { collectionId } },
      relations: ['project'],
    });

    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const updatedPortfolio = {
      ...portfolio,
      ...dto,
    };

    await this.portfolioRepository.save(updatedPortfolio);
    return portfolio;
  }
}
