import { Module } from "@nestjs/common";
import { DatasetLoaderModule } from "./features/dataset-loader/dataset-loader.module";
import { DatasetReaderModule } from "./features/dataset-reader/dataset-reader.module";
import { OutputModule } from "./features/output/output.module";
import { ConfigModule } from "./shared/config/config.module";
import { DatasetPipelineService } from "./app/dataset-pipeline.service";

@Module({
  imports: [
    ConfigModule,
    DatasetLoaderModule,
    DatasetReaderModule,
    OutputModule,
  ],
  providers: [DatasetPipelineService],
})
export class AppModule {}
