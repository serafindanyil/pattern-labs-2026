import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseDto } from './course.dto';
import { z } from 'zod';

export const CreateSpecializationSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export const UpdateSpecializationSchema = CreateSpecializationSchema.partial();

export class CreateSpecializationDto extends createZodDto(
  CreateSpecializationSchema,
) {
  @ApiProperty({ example: 'Full Stack Web Development' })
  title!: string;

  @ApiProperty({
    example:
      'Комплексна спеціалізація з frontend, backend, баз даних та розгортання веб-додатків.',
  })
  description!: string;
}

export class UpdateSpecializationDto extends createZodDto(
  UpdateSpecializationSchema,
) {
  @ApiPropertyOptional({ example: 'Full Stack Web Development' })
  title?: string;

  @ApiPropertyOptional({
    example:
      'Комплексна спеціалізація з frontend, backend, баз даних та розгортання веб-додатків.',
  })
  description?: string;
}

export class SpecializationDto {
  @ApiProperty({ example: '3f7f87f0-1439-40d4-85a1-78fdc692f42b' })
  id!: string;

  @ApiProperty({ example: 'Full Stack Web Development' })
  title!: string;

  @ApiProperty({
    example:
      'Комплексна спеціалізація з frontend, backend, баз даних та розгортання веб-додатків.',
  })
  description!: string;
}

export class SpecializationWithCoursesDto extends SpecializationDto {
  @ApiProperty({ type: () => [CourseDto] })
  courses!: CourseDto[];
}

export class DeleteResultDto {
  @ApiProperty({ example: true })
  success!: boolean;
}
