import {
  BadRequestException,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { tokens } from 'src/common/tokens';

@Injectable()
export class TokenService implements OnApplicationBootstrap {
  private logger = new Logger(TokenService.name);
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  onApplicationBootstrap() {
    this.addTokensAtStartup();
  }

  private async create(dto: CreateTokenDto) {
    return await this.tokenRepository.save(dto);
  }

  async findAll(request = {}) {
    return await this.tokenRepository.find({
      where: request,
    });
  }

  async findOne(request = {}) {
    return await this.tokenRepository.findOne({
      where: request,
    });
  }

  async addToken(dto: CreateTokenDto) {
    try {
      const isTokenInDB = await this.findOne({ symbol: dto.symbol });
      if (isTokenInDB)
        // throw new BadRequestException(`Token ${dto.symbol} is already in DB!`);
        return isTokenInDB;
      return this.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async addTokensAtStartup() {
    try {
      for (const token of tokens) {
        await this.addToken(token);
      }
      return { success: true };
    } catch (error) {
      return this.logger.error('addTokensAtStartup error:', error.message);
    }
  }
}
