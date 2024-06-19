import { Body, Controller, Post } from '@nestjs/common';
import { SendTokenDto, SendTokenResponseDto } from './dto/send-token.dto';
import { FaucetService } from './faucet.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Faucet API')
@Controller('faucet')
export class FaucetController {
  constructor(private readonly faucetService: FaucetService) {}

  @Post()
  @ApiOperation({ summary: 'Get tokens' })
  @ApiResponse({
    status: 201,
    type: SendTokenResponseDto,
  })
  async faucetTokens(@Body() dto: SendTokenDto) {
    // Send tokens to the user

    return this.faucetService.faucetTokens(dto.recipient);
  }
}
