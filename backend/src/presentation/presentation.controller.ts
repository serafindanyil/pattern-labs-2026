import { Controller, Post, Inject, HttpCode, HttpStatus, Body } from '@nestjs/common';
import type { IPresentation } from '../domain/interfaces/presentation.interface';
import type { IBusinessLogic } from '../domain/interfaces/business-logic.interface';

@Controller('data')
export class PresentationController implements IPresentation {
  constructor(
    @Inject('IBusinessLogic')
    private readonly businessLogic: IBusinessLogic,
  ) {}

  @Post('load')
  @HttpCode(HttpStatus.OK)
  async triggerDataLoad(@Body('filePath') filePath?: string): Promise<{ success: boolean; rowsProcessed: number }> {
    const targetFile = filePath || './data.csv';
    return await this.businessLogic.processDataLoad(targetFile);
  }
}
