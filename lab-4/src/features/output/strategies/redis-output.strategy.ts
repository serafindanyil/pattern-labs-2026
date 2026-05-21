import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { AppConfig } from "../../../shared/config/app-config.type";
import { APP_CONFIG } from "../../../shared/constants/app.constants";
import { OutputStrategy } from "../output-strategy.interface";

@Injectable()
export class RedisOutputStrategy implements OutputStrategy {
  private redis: Redis | null = null;

  constructor(@Inject(APP_CONFIG) private readonly appConfig: AppConfig) {}

  async open(): Promise<void> {
    this.redis = new Redis(this.appConfig.redis.url, {
      lazyConnect: true,
    });

    await this.redis.connect();
  }

  async write(line: string): Promise<void> {
    if (!this.redis) {
      throw new Error("Redis client is not connected");
    }

    await this.redis.rpush(this.appConfig.redis.key, line);
  }

  async close(): Promise<void> {
    await this.redis?.quit();
  }
}
