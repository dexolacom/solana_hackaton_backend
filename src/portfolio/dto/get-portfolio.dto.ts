import { ApiProperty } from '@nestjs/swagger';

export class GetPortfolioDto {
  @ApiProperty({
    example: '73ce753e-715e-4b1d-85eb-2139b6404c27',
    description: 'Project id',
  })
  readonly projectId: string;
  @ApiProperty({
    example: 3,
    description: 'Portfolio id',
  })
  readonly portfolioId: number;
}
