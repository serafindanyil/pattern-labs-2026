import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateSpecializationSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
});

export const UpdateSpecializationSchema = CreateSpecializationSchema.partial();

export class CreateSpecializationDto extends createZodDto(
  CreateSpecializationSchema,
) {}
export class UpdateSpecializationDto extends createZodDto(
  UpdateSpecializationSchema,
) {}
