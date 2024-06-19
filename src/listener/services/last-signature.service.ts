import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LastSignature } from '../entities/last-signature.entity';
import { CreateSignatureDto } from '../dto/last-signature.dto';

@Injectable()
export class LastSignatureService {
  private readonly logger = new Logger(LastSignatureService.name);

  constructor(
    @InjectRepository(LastSignature)
    private readonly lastSignatureRepository: Repository<LastSignature>,
  ) {}

  async create(dto: CreateSignatureDto) {
    this.logger.log('Creating a new newSignature');

    const newSignature = this.lastSignatureRepository.create(dto);
    await this.lastSignatureRepository.save(newSignature);
    return newSignature;
  }

  async findOne(condition = {}) {
    return await this.lastSignatureRepository.findOne({
      where: condition,
    });
  }

  async findOrCreate(program: string, dto: CreateSignatureDto) {
    try {
      let lastSignature = await this.findOne({ program });
      if (!lastSignature) {
        lastSignature = await this.create(dto);
      }
      return lastSignature.signature;
    } catch (error) {
      this.logger.error('findOrCreate error', error.message);
      throw new Error(error.message);
    }
  }

  async update(dto: CreateSignatureDto) {
    return await this.lastSignatureRepository.update(
      { program: dto.program },
      dto,
    );
  }

  async findAll() {
    return await this.lastSignatureRepository.find();
  }
}
