import { Module } from "@nestjs/common";
import { DatasetFileWriterService } from "./dataset-file-writer.service";
import { DatasetLoaderService } from "./dataset-loader.service";
import { DatasetNormalizerService } from "./dataset-normalizer.service";

@Module({
  providers: [
    DatasetLoaderService,
    DatasetNormalizerService,
    DatasetFileWriterService,
  ],
  exports: [DatasetLoaderService],
})
export class DatasetLoaderModule {}
