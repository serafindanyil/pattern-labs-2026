import { Inject, Injectable } from "@nestjs/common";
import { DatasetLoaderService } from "../features/dataset-loader/dataset-loader.service";
import { DatasetFileReaderService } from "../features/dataset-reader/dataset-file-reader.service";
import { OutputStrategy } from "../features/output/output-strategy.interface";
import { OUTPUT_STRATEGY } from "../shared/constants/app.constants";

@Injectable()
export class DatasetPipelineService {
  constructor(
    private readonly datasetLoaderService: DatasetLoaderService,
    private readonly datasetFileReaderService: DatasetFileReaderService,
    @Inject(OUTPUT_STRATEGY) private readonly outputStrategy: OutputStrategy,
  ) {}

  async run(): Promise<void> {
    const filePath = await this.datasetLoaderService.loadToFile();

    await this.outputStrategy.open();

    try {
      for await (const line of this.datasetFileReaderService.readLines(
        filePath,
      )) {
        await this.outputStrategy.write(line);
      }
    } finally {
      await this.outputStrategy.close();
    }
  }
}
