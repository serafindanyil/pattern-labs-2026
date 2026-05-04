import { Injectable, NotFoundException } from '@nestjs/common';
import { SpecializationDataAccessService } from '../data-access/specialization-data-access.service';
import {
  CreateSpecializationDto,
  UpdateSpecializationDto,
} from '../domain/dtos/specialization.dto';

@Injectable()
export class SpecializationBusinessLogicService {
  constructor(private readonly dataAccess: SpecializationDataAccessService) {}

  async findAll() {
    return this.dataAccess.findAll();
  }

  async findByIdWithCourses(id: string) {
    const spec = await this.dataAccess.findByIdWithCourses(id);
    if (!spec) {
      throw new NotFoundException(`Specialization with id ${id} not found`);
    }
    return spec;
  }

  async create(dto: CreateSpecializationDto) {
    return this.dataAccess.create(dto);
  }

  async update(id: string, dto: UpdateSpecializationDto) {
    await this.findByIdWithCourses(id);
    return this.dataAccess.update(id, dto);
  }

  async delete(id: string) {
    await this.findByIdWithCourses(id);
    await this.dataAccess.delete(id);
    return { success: true, message: 'Specialization deleted successfully' };
  }
}
