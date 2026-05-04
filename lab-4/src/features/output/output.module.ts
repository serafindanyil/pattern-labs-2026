import { Module } from "@nestjs/common";
import { outputStrategyProvider } from "./output-strategy.provider";
import { ConsoleOutputStrategy } from "./strategies/console-output.strategy";
import { KafkaOutputStrategy } from "./strategies/kafka-output.strategy";
import { RedisOutputStrategy } from "./strategies/redis-output.strategy";

@Module({
  providers: [
    ConsoleOutputStrategy,
    KafkaOutputStrategy,
    RedisOutputStrategy,
    outputStrategyProvider,
  ],
  exports: [outputStrategyProvider],
})
export class OutputModule {}
