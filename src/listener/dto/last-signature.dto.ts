import { ApiProperty } from '@nestjs/swagger';

export class CreateSignatureDto {
  @ApiProperty({
    example: 'BxcGdnbRBXvxPcjSW2f7Gtc9iqPdGNZbf9Z5RqyXxpWM',
    description: 'Program address',
  })
  program: string;

  @ApiProperty({
    example:
      '2tkEhTCVATfryLXLRS7tYsvqgDzHCoTGV3CzacrLpYzLzSNai4ATnbx6wq8TqVHChmq9wHkLwmpwpUwXJv5d8Qhj',
    description: 'Signature',
  })
  signature: string;

  @ApiProperty({
    example: 306563127,
    description: 'slot',
  })
  slot: number;
}
