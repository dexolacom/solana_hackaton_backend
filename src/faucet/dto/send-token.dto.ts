import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SendTokenDto {
  @ApiProperty({
    example: 'AguvXyhZXA9WMXfezVHCnz9rjGDPRrDY6FdMcmgSaaKN',
    description: 'Program address',
  })
  @IsNotEmpty()
  recipient: string;
}

export class SendTokenResponseDto {
  @ApiProperty({
    example: {
      amount: 100,
      message: 'Tokens sent successfully',
      transaction:
        '5CLKhZoPrj84KVJMxg1tkvYDeUYgb7xA23vz6u4rzAk66dou5CeHGSjn2efJz5TNoRa7RyiHCsUnKhGdpBXPvySM',
    },
    description: 'Faucet Token response',
    type: Object,
  })
  readonly response: object;
}
