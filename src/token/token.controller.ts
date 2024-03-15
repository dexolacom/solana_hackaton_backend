import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto, CreateTokenResponseDto } from './dto/create-token.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Token API')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  @ApiOperation({ summary: 'Create Token in DB' })
  @ApiResponse({
    status: 201,
    type: CreateTokenResponseDto,
  })
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.addToken(createTokenDto);
  }

  @Get('list')
  findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(+id);
  }
}
