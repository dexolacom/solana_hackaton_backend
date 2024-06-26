import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddProjectDto {
  @ApiProperty({
    example: 'Classic',
    description: 'Project name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: ['BTC', 'SOL', 'ETH', 'JUP', 'RNDR', 'HNT', 'BONK', 'PYTH'],
    description: 'Project tokens',
  })
  @IsArray()
  @IsString({ each: true })
  tokens: string[];

  // @ApiProperty({
  //   example: [30, 20, 15, 10, 10, 5, 5, 5],
  //   description: 'Distribution of token percents',
  // })
  // @IsArray()
  // distributions: number[];
}

export class AddProjectResponseDto {
  @ApiProperty({
    example: true,
    description: 'success status',
  })
  readonly success: boolean;

  @ApiProperty({
    example: 'Project with name Classic successfully added!',
    description: 'message',
  })
  readonly message: string;
}

export class GetPortfolioDto {
  @ApiProperty({
    example: '73ce753e-715e-4b1d-85eb-2139b6404c27',
    description: 'Project id',
  })
  @IsUUID()
  readonly projectId: string;

  @ApiProperty({
    example: 14,
    description: 'Portfolio id',
  })
  readonly portfolioId: number;
}
