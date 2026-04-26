import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';

export const CreateCourseSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  specializationId: z.string().uuid().nullable().optional(),
});

export const UpdateCourseSchema = CreateCourseSchema.partial();

export class CreateCourseDto extends createZodDto(CreateCourseSchema) {
  @ApiProperty({ example: 'Backend with NestJS' })
  title!: string;

  @ApiProperty({
    example: 'REST API, MVC, валідація, Prisma та бізнес-логіка.',
  })
  description!: string;

  @ApiPropertyOptional({
    example: '3f7f87f0-1439-40d4-85a1-78fdc692f42b',
    nullable: true,
    type: String,
  })
  specializationId?: string | null;
}

export class UpdateCourseDto extends createZodDto(UpdateCourseSchema) {
  @ApiPropertyOptional({ example: 'Backend with NestJS' })
  title?: string;

  @ApiPropertyOptional({
    example: 'REST API, MVC, валідація, Prisma та бізнес-логіка.',
  })
  description?: string;

  @ApiPropertyOptional({
    example: '3f7f87f0-1439-40d4-85a1-78fdc692f42b',
    nullable: true,
    type: String,
  })
  specializationId?: string | null;
}

export class CourseDto {
  @ApiProperty({ example: '9d4d54c8-4f2e-4e07-a4bc-52d0694de326' })
  id!: string;

  @ApiProperty({ example: 'Backend with NestJS' })
  title!: string;

  @ApiProperty({
    example: 'REST API, MVC, валідація, Prisma та бізнес-логіка.',
  })
  description!: string;

  @ApiPropertyOptional({
    example: '3f7f87f0-1439-40d4-85a1-78fdc692f42b',
    nullable: true,
    type: String,
  })
  specializationId!: string | null;
}

export class CourseSpecializationDto {
  @ApiProperty({ example: '3f7f87f0-1439-40d4-85a1-78fdc692f42b' })
  id!: string;

  @ApiProperty({ example: 'Full Stack Web Development' })
  title!: string;
}

export class CourseWithSpecializationDto extends CourseDto {
  @ApiPropertyOptional({
    type: () => CourseSpecializationDto,
    nullable: true,
  })
  specialization!: CourseSpecializationDto | null;
}
