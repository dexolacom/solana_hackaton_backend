import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AddProjectDto, AddProjectResponseDto } from './dto/add-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Project API')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create Project in DB' })
  @ApiResponse({
    status: 201,
    type: AddProjectResponseDto,
  })
  addProject(@Body() dto: AddProjectDto) {
    return this.projectService.addProject(dto);
  }

  @Get('list')
  @ApiOperation({ summary: 'List of all Projects' })
  @ApiResponse({
    status: 200,
    // type: AddProjectResponseDto,
  })
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Project by ID' })
  @ApiResponse({
    status: 201,
    // type: AddProjectResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.projectService.getProjectTokens(id);
  }
}
