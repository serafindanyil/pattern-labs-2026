import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PresentationController } from './presentation/presentation.controller';
import { BusinessLogicService } from './business-logic/business-logic.service';
import { DataAccessService } from './data-access/data-access.service';

@Module({
  imports: [],
  controllers: [AppController, PresentationController],
  providers: [
    AppService,
    {
      provide: 'IDataAccess',
      useClass: DataAccessService,
    },
    {
      provide: 'IBusinessLogic',
      useClass: BusinessLogicService,
    },
  ],
})
export class AppModule {}
