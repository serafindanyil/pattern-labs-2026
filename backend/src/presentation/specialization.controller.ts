import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SpecializationBusinessLogicService } from '../business-logic/specialization-business-logic.service';
import {
  CreateSpecializationDto,
  DeleteResultDto,
  SpecializationWithCoursesDto,
  UpdateSpecializationDto,
} from '../domain/dtos/specialization.dto';

@ApiTags('Specializations')
@Controller('api/specializations')
export class SpecializationController {
  constructor(private readonly specLogic: SpecializationBusinessLogicService) {}

  @Get()
  @ApiOperation({ summary: 'Get all specializations' })
  @ApiResponse({ status: 200, type: [SpecializationWithCoursesDto] })
  async findAll() {
    return this.specLogic.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specialization by id with courses included' })
  @ApiParam({ name: 'id', description: 'Specialization ID' })
  @ApiResponse({
    status: 200,
    type: SpecializationWithCoursesDto,
  })
  @ApiResponse({ status: 404, description: 'Specialization not found' })
  async findById(@Param('id') id: string) {
    return this.specLogic.findByIdWithCourses(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create new specialization' })
  @ApiResponse({ status: 201, type: SpecializationWithCoursesDto })
  async create(@Body() dto: CreateSpecializationDto) {
    return this.specLogic.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update specialization' })
  @ApiParam({ name: 'id', description: 'Specialization ID' })
  @ApiResponse({ status: 200, type: SpecializationWithCoursesDto })
  @ApiResponse({ status: 404, description: 'Specialization not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateSpecializationDto) {
    return this.specLogic.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specialization' })
  @ApiParam({ name: 'id', description: 'Specialization ID' })
  @ApiResponse({ status: 200, type: DeleteResultDto })
  @ApiResponse({ status: 404, description: 'Specialization not found' })
  async remove(@Param('id') id: string) {
    return this.specLogic.delete(id);
  }
}
