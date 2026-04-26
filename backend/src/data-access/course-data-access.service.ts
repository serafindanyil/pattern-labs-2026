import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

const COURSE_WITH_SPECIALIZATION = {
  specialization: {
    select: {
      id: true,
      title: true,
    },
  },
} satisfies Prisma.CourseInclude;

export type CourseWithSpecialization = Prisma.CourseGetPayload<{
  include: typeof COURSE_WITH_SPECIALIZATION;
}>;

@Injectable()
export class CourseDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CourseWithSpecialization[]> {
    return this.prisma.course.findMany({
      include: COURSE_WITH_SPECIALIZATION,
      orderBy: { title: 'asc' },
    });
  }

  async findById(id: string): Promise<CourseWithSpecialization | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include: COURSE_WITH_SPECIALIZATION,
    });
  }

  async create(data: {
    title: string;
    description: string;
    specializationId?: string | null;
  }): Promise<CourseWithSpecialization> {
    return this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        specializationId: data.specializationId ?? null,
      },
      include: COURSE_WITH_SPECIALIZATION,
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      specializationId?: string | null;
    },
  ): Promise<CourseWithSpecialization> {
    return this.prisma.course.update({
      where: { id },
      data,
      include: COURSE_WITH_SPECIALIZATION,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }
}
