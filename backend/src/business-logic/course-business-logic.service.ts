import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseDataAccessService } from '../data-access/course-data-access.service';
import { CreateCourseDto, UpdateCourseDto } from '../domain/dtos/course.dto';

@Injectable()
export class CourseBusinessLogicService {
  constructor(private readonly dataAccess: CourseDataAccessService) {}

  async findAll() {
    return this.dataAccess.findAll();
  }

  async findById(id: string) {
    const course = await this.dataAccess.findById(id);
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async create(dto: CreateCourseDto) {
    return this.dataAccess.create(dto);
  }

  async update(id: string, dto: UpdateCourseDto) {
    await this.findById(id); // Ensures it exists
    return this.dataAccess.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id); // Ensures it exists
    await this.dataAccess.delete(id);
    return { success: true, message: 'Course deleted successfully' };
  }
}
