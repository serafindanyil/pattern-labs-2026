import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

const SPECIALIZATION_WITH_COURSES = {
  courses: true,
} satisfies Prisma.SpecializationInclude;

export type SpecializationWithCourses = Prisma.SpecializationGetPayload<{
  include: typeof SPECIALIZATION_WITH_COURSES;
}>;

@Injectable()
export class SpecializationDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SpecializationWithCourses[]> {
    return this.prisma.specialization.findMany({
      include: SPECIALIZATION_WITH_COURSES,
      orderBy: { title: 'asc' },
    });
  }

  async findByIdWithCourses(
    id: string,
  ): Promise<SpecializationWithCourses | null> {
    return this.prisma.specialization.findUnique({
      where: { id },
      include: SPECIALIZATION_WITH_COURSES,
    });
  }

  async create(data: {
    title: string;
    description: string;
  }): Promise<SpecializationWithCourses> {
    return this.prisma.specialization.create({
      data,
      include: SPECIALIZATION_WITH_COURSES,
    });
  }

  async update(
    id: string,
    data: { title?: string; description?: string },
  ): Promise<SpecializationWithCourses> {
    return this.prisma.specialization.update({
      where: { id },
      data,
      include: SPECIALIZATION_WITH_COURSES,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.specialization.delete({ where: { id } });
  }
}
