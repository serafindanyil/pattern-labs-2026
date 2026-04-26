import { Module } from '@nestjs/common';

// New Features imports
import { CourseController } from './presentation/course.controller';
import { SpecializationController } from './presentation/specialization.controller';
import { CourseBusinessLogicService } from './business-logic/course-business-logic.service';
import { SpecializationBusinessLogicService } from './business-logic/specialization-business-logic.service';
import { CourseDataAccessService } from './data-access/course-data-access.service';
import { SpecializationDataAccessService } from './data-access/specialization-data-access.service';

@Module({
  imports: [],
  controllers: [CourseController, SpecializationController],
  providers: [
    CourseBusinessLogicService,
    SpecializationBusinessLogicService,
    CourseDataAccessService,
    SpecializationDataAccessService,
  ],
})
export class AppModule {}
