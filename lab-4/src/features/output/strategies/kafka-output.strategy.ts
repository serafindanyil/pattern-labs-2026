import { Inject, Injectable } from "@nestjs/common";
import { Kafka, Partitioners, Producer } from "kafkajs";
import { APP_CONFIG } from "../../../shared/constants/app.constants";
import { AppConfig } from "../../../shared/config/app-config.type";
import { OutputStrategy } from "../output-strategy.interface";

@Injectable()
export class KafkaOutputStrategy implements OutputStrategy {
  private producer: Producer | null = null;

  constructor(@Inject(APP_CONFIG) private readonly appConfig: AppConfig) {}

  async open(): Promise<void> {
    const kafka = new Kafka({
      clientId: this.appConfig.kafka.clientId,
      brokers: this.appConfig.kafka.brokers,
    });

    const admin = kafka.admin();
    await admin.connect();

    try {
      const topics = await admin.listTopics();

      if (!topics.includes(this.appConfig.kafka.topic)) {
        await admin.createTopics({
          topics: [{ topic: this.appConfig.kafka.topic }],
          waitForLeaders: true,
        });
      }
    } finally {
      await admin.disconnect();
    }

    this.producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    await this.producer.connect();
  }

  async write(line: string): Promise<void> {
    if (!this.producer) {
      throw new Error("Kafka producer is not connected");
    }

    await this.producer.send({
      topic: this.appConfig.kafka.topic,
      messages: [{ value: line }],
    });
  }

  async close(): Promise<void> {
    await this.producer?.disconnect();
  }
}
