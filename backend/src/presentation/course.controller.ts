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
import { CourseBusinessLogicService } from '../business-logic/course-business-logic.service';
import {
  CourseWithSpecializationDto,
  CreateCourseDto,
  UpdateCourseDto,
} from '../domain/dtos/course.dto';
import { DeleteResultDto } from '../domain/dtos/specialization.dto';

@ApiTags('Courses')
@Controller('api/courses')
export class CourseController {
  constructor(private readonly courseLogic: CourseBusinessLogicService) {}

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, type: [CourseWithSpecializationDto] })
  async findAll() {
    return this.courseLogic.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by id' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, type: CourseWithSpecializationDto })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async findById(@Param('id') id: string) {
    return this.courseLogic.findById(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create new course' })
  @ApiResponse({ status: 201, type: CourseWithSpecializationDto })
  async create(@Body() dto: CreateCourseDto) {
    return this.courseLogic.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, type: CourseWithSpecializationDto })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseLogic.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, type: DeleteResultDto })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async remove(@Param('id') id: string) {
    return this.courseLogic.delete(id);
  }
}
