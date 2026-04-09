import { Injectable, Inject, Logger } from '@nestjs/common';
import type { IBusinessLogic } from '../domain/interfaces/business-logic.interface';
import type { IDataAccess, ICsvRow } from '../domain/interfaces/data-access.interface';
import { CompleteDomainModel } from '../domain/models/domain.model';

@Injectable()
export class BusinessLogicService implements IBusinessLogic {
  private readonly logger = new Logger(BusinessLogicService.name);

  constructor(
    @Inject('IDataAccess')
    private readonly dataAccess: IDataAccess,
  ) {}

  async processDataLoad(filePath: string): Promise<{ success: boolean; rowsProcessed: number }> {
    try {
      this.logger.log(`Processing data load from ${filePath}...`);
      
      const rows: ICsvRow[] = await this.dataAccess.readCsv(filePath);
      
      if (rows && rows.length > 0) {
        const domainModels: CompleteDomainModel[] = rows.map((row) => ({
          authLearner: {
            email: row.email,
            password: row.password,
            fullName: row.fullName,
          },
          specialization: {
            title: row.specializationTitle,
            description: row.specializationDescription,
          },
          course: {
            title: row.courseTitle,
            specializationTitle: row.specializationTitle,
          },
          subscription: {
            title: row.subscriptionTitle,
            type: row.subscriptionType,
            price: parseFloat(row.subscriptionPrice),
          },
          enrollment: {
            learnerEmail: row.email,
            specializationTitle: row.specializationTitle,
            subscriptionTitle: row.subscriptionTitle,
            subscriptionType: row.subscriptionType,
            enrolledAt: row.enrolledAt,
          }
        }));

        this.logger.log(`Created ${domainModels.length} domain models. Proceeding to save...`);
        await this.dataAccess.saveData(domainModels);
        return { success: true, rowsProcessed: rows.length };
      }
      return { success: false, rowsProcessed: 0 };
    } catch (err) {
      this.logger.error('Error during data load', err);
      return { success: false, rowsProcessed: 0 };
    }
  }
}
