import { Injectable } from '@nestjs/common';
import { PrismaClient, Specialization } from '@prisma/client';

@Injectable()
export class SpecializationDataAccessService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Specialization[]> {
    return this.prisma.specialization.findMany();
  }

  async findByIdWithCourses(id: string): Promise<Specialization | null> {
    return this.prisma.specialization.findUnique({
      where: { id },
      include: { courses: true },
    });
  }

  async create(data: {
    title: string;
    description: string;
  }): Promise<Specialization> {
    return this.prisma.specialization.create({ data });
  }

  async update(
    id: string,
    data: { title?: string; description?: string },
  ): Promise<Specialization> {
    return this.prisma.specialization.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.specialization.delete({ where: { id } });
  }
}
