import { Body, Controller, Get, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPortfolioDto } from './dto/get-portfolio.dto';

@ApiTags('Portfolio API')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: 'List of all Portfolios' })
  @ApiResponse({
    status: 200,
    // type: AddProjectResponseDto,
  })
  findAll() {
    return this.portfolioService.findAll();
  }

  @Post('project')
  @ApiOperation({ summary: 'List of all Portfolios' })
  @ApiResponse({
    status: 200,
    // type: AddProjectResponseDto,
  })
  findByProject(@Body() dto: GetPortfolioDto) {
    return this.portfolioService.findOneByProject(
      dto.portfolioId,
      dto.projectId,
    );
  }
}
