export interface IBusinessLogic {
  processDataLoad(filePath: string): Promise<{ success: boolean; rowsProcessed: number }>;
}
