import { config as loadDotenv } from "dotenv";
import { z } from "zod";
import {
  DEFAULT_DATASET_FILE_PATH,
  DEFAULT_KAFKA_BROKERS,
  DEFAULT_KAFKA_CLIENT_ID,
  DEFAULT_KAFKA_TOPIC,
  DEFAULT_REDIS_KEY,
  DEFAULT_REDIS_URL,
} from "../constants/app.constants";
import { AppConfig } from "./app-config.type";
import { OutputStrategyName } from "./output-strategy.enum";

const envSchema = z.object({
  DATASET_URL: z.string().url(),
  DATASET_FILE_PATH: z.string().min(1).default(DEFAULT_DATASET_FILE_PATH),
  OUTPUT_STRATEGY: z
    .nativeEnum(OutputStrategyName)
    .default(OutputStrategyName.Console),
  KAFKA_CLIENT_ID: z.string().min(1).default(DEFAULT_KAFKA_CLIENT_ID),
  KAFKA_BROKERS: z.string().min(1).default(DEFAULT_KAFKA_BROKERS),
  KAFKA_TOPIC: z.string().min(1).default(DEFAULT_KAFKA_TOPIC),
  REDIS_URL: z.string().url().default(DEFAULT_REDIS_URL),
  REDIS_KEY: z.string().min(1).default(DEFAULT_REDIS_KEY),
});

export const loadAppConfig = (): AppConfig => {
  loadDotenv({ quiet: true });

  const env = envSchema.parse(process.env);

  return {
    datasetUrl: env.DATASET_URL,
    datasetFilePath: env.DATASET_FILE_PATH,
    outputStrategy: env.OUTPUT_STRATEGY,
    kafka: {
      clientId: env.KAFKA_CLIENT_ID,
      brokers: env.KAFKA_BROKERS.split(",").map((broker) => broker.trim()),
      topic: env.KAFKA_TOPIC,
    },
    redis: {
      url: env.REDIS_URL,
      key: env.REDIS_KEY,
    },
  };
};
