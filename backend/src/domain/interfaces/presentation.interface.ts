export interface IPresentation {
  triggerDataLoad(filePath?: string): Promise<{ success: boolean; rowsProcessed: number }>;
}
