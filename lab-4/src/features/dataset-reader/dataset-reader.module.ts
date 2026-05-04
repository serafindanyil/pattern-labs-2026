import { Module } from "@nestjs/common";
import { DatasetFileReaderService } from "./dataset-file-reader.service";

@Module({
  providers: [DatasetFileReaderService],
  exports: [DatasetFileReaderService],
})
export class DatasetReaderModule {}
