import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateCourseSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
});

export const UpdateCourseSchema = CreateCourseSchema.partial();

export class CreateCourseDto extends createZodDto(CreateCourseSchema) {}
export class UpdateCourseDto extends createZodDto(UpdateCourseSchema) {}
