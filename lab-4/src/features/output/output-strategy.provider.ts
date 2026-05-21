import { Provider } from "@nestjs/common";
import { AppConfig } from "../../shared/config/app-config.type";
import { OutputStrategyName } from "../../shared/config/output-strategy.enum";
import {
  APP_CONFIG,
  OUTPUT_STRATEGY,
} from "../../shared/constants/app.constants";
import { OutputStrategy } from "./output-strategy.interface";
import { ConsoleOutputStrategy } from "./strategies/console-output.strategy";
import { KafkaOutputStrategy } from "./strategies/kafka-output.strategy";
import { RedisOutputStrategy } from "./strategies/redis-output.strategy";

export const outputStrategyProvider: Provider<OutputStrategy> = {
  provide: OUTPUT_STRATEGY,
  inject: [
    APP_CONFIG,
    ConsoleOutputStrategy,
    KafkaOutputStrategy,
    RedisOutputStrategy,
  ],
  useFactory: (
    appConfig: AppConfig,
    consoleOutputStrategy: ConsoleOutputStrategy,
    kafkaOutputStrategy: KafkaOutputStrategy,
    redisOutputStrategy: RedisOutputStrategy,
  ): OutputStrategy => {
    const strategies: Record<OutputStrategyName, OutputStrategy> = {
      [OutputStrategyName.Console]: consoleOutputStrategy,
      [OutputStrategyName.Kafka]: kafkaOutputStrategy,
      [OutputStrategyName.Redis]: redisOutputStrategy,
    };

    return strategies[appConfig.outputStrategy];
  },
};
