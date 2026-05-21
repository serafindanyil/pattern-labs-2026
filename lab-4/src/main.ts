import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DatasetPipelineService } from "./app/dataset-pipeline.service";

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ["error", "warn"],
  });

  try {
    await app.get(DatasetPipelineService).run();
  } finally {
    await app.close();
  }
};

void bootstrap();
