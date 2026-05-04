import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseDataAccessService } from '../data-access/course-data-access.service';
import { CreateCourseDto, UpdateCourseDto } from '../domain/dtos/course.dto';
import { SpecializationDataAccessService } from '../data-access/specialization-data-access.service';

@Injectable()
export class CourseBusinessLogicService {
  constructor(
    private readonly dataAccess: CourseDataAccessService,
    private readonly specializationDataAccess: SpecializationDataAccessService,
  ) {}

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
    await this.ensureSpecializationExists(dto.specializationId);
    return this.dataAccess.create(dto);
  }

  async update(id: string, dto: UpdateCourseDto) {
    await this.findById(id);
    await this.ensureSpecializationExists(dto.specializationId);
    return this.dataAccess.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.dataAccess.delete(id);
    return { success: true };
  }

  private async ensureSpecializationExists(id?: string | null) {
    if (!id) {
      return;
    }

    const specialization =
      await this.specializationDataAccess.findByIdWithCourses(id);

    if (!specialization) {
      throw new NotFoundException(`Specialization with id ${id} not found`);
    }
  }
}
