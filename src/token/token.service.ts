import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  private logger = new Logger(TokenService.name);
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

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
        throw new BadRequestException(`Token ${dto.symbol} is already in DB!`);
      return this.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
