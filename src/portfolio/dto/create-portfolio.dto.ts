import { ApiProperty } from '@nestjs/swagger';
import { EStatus } from 'src/@enums';

export class CreatePortfolioDto {
  @ApiProperty({
    example: 3,
    description: 'Portfolio id',
  })
  portfolioId: number;

  @ApiProperty({
    example: 'BxcGdnbRBXvxPcjSW2f7Gtc9iqPdGNZbf9Z5RqyXxpWM',
    description: 'Program address',
  })
  program: string;

  @ApiProperty({
    example: 312000000,
    description: 'amount',
  })
  amount: number;

  @ApiProperty({
    example: {
      USDC: {
        amount: '1000000000',
        decimals: 6,
        uiAmount: 100,
      },
    },
    description: 'Coin amounts',
  })
  coinAmounts?: {
    [key: string]: {
      amount: string;
      decimals: number;
      uiAmount: number;
    };
  };
}

export class UpdatePortfolioDto {
  @ApiProperty({
    example: EStatus.RECEIVED,
    description: 'Status',
  })
  status: EStatus;

  @ApiProperty({
    example: 'BxcGdnbRBXvxPcjSW2f7Gtc9iqPdGNZbf9Z5RqyXxpWM',
    description: 'Burner address',
  })
  signer?: string;

  @ApiProperty({
    example: {
      USDC: {
        amount: '1000000000',
        decimals: 6,
        uiAmount: 100,
      },
    },
    description: 'Coin amounts',
  })
  coinAmounts?: {
    [key: string]: {
      amount: string;
      decimals: number;
      uiAmount: number;
    };
  };
}
