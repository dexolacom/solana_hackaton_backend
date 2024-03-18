import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ERiskType } from 'src/@enums';

export class CreateTokenDto {
  @ApiProperty({
    example: 'Solana',
    description: 'Token name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'SOL',
    description: 'Token symbol',
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiProperty({
    example: ERiskType.MEDIUM,
    description: 'Risk type',
  })
  @IsEnum(ERiskType)
  riskType: string;

  @ApiProperty({
    example: 5426,
    description: 'UCID from coinMarketCap',
  })
  coinmarketcapId: number;
}

export class CreateTokenResponseDto {
  @ApiProperty({
    example: {
      name: 'Solana',
      symbol: 'SOL',
      riskType: 'Medium',
      coinmarketcapId: 5426,
      id: '12f5a256-bc14-4562-b6e8-10252cec39cb',
      created_at: '2024-03-15T14:23:06.205Z',
      updated_at: '2024-03-15T14:23:06.205Z',
    },
    description: 'Add Token to DB response',
    type: Object,
  })
  readonly token: object;
}
