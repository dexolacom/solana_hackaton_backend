import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Classic',
    description: 'Project name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

// @ApiProperty({
//     example: 20,
//     description: 'Distribution percent',
//   })
//   @IsNotEmpty()
//   @IsNumber()
//   distribution: number;
