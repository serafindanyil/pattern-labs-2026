import { Injectable } from '@nestjs/common';
import { PrismaClient, Course } from '@prisma/client';

@Injectable()
export class CourseDataAccessService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async findById(id: string): Promise<Course | null> {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async create(data: { title: string; description?: string }): Promise<Course> {
    return this.prisma.course.create({
      data: { title: data.title, description: data.description || '' },
    });
  }

  async update(
    id: string,
    data: { title?: string; description?: string },
  ): Promise<Course> {
    return this.prisma.course.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }
}
