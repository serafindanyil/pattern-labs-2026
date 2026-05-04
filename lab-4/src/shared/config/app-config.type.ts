import { OutputStrategyName } from "./output-strategy.enum";

export type AppConfig = {
  datasetUrl: string;
  datasetFilePath: string;
  outputStrategy: OutputStrategyName;
  kafka: {
    clientId: string;
    brokers: string[];
    topic: string;
  };
  redis: {
    url: string;
    key: string;
  };
};
