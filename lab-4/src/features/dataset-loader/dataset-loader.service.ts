import { Inject, Injectable } from "@nestjs/common";
import { AppConfig } from "../../shared/config/app-config.type";
import { APP_CONFIG } from "../../shared/constants/app.constants";
import { DatasetFileWriterService } from "./dataset-file-writer.service";
import { DatasetNormalizerService } from "./dataset-normalizer.service";

@Injectable()
export class DatasetLoaderService {
  constructor(
    @Inject(APP_CONFIG) private readonly appConfig: AppConfig,
    private readonly datasetNormalizerService: DatasetNormalizerService,
    private readonly datasetFileWriterService: DatasetFileWriterService,
  ) {}

  async loadToFile(): Promise<string> {
    const response = await fetch(this.appConfig.datasetUrl);

    if (!response.ok) {
      throw new Error(`Dataset request failed with status ${response.status}`);
    }

    const rawDataset = JSON.parse(await response.text()) as unknown;
    const records = this.datasetNormalizerService.normalize(rawDataset);

    await this.datasetFileWriterService.writeRecords(
      this.appConfig.datasetFilePath,
      records,
    );

    return this.appConfig.datasetFilePath;
  }
}
