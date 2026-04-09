import { CompleteDomainModel } from '../models/domain.model';

export interface ICsvRow {
  email: string;
  password: string;
  fullName: string;
  specializationTitle: string;
  specializationDescription: string;
  courseTitle: string;
  subscriptionTitle: string;
  subscriptionType: string;
  subscriptionPrice: string;
  enrolledAt: string;
}

export interface IDataAccess {
  readCsv(filePath: string): Promise<ICsvRow[]>;
  saveData(data: CompleteDomainModel[]): Promise<void>;
}
