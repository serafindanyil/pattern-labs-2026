import { Injectable } from "@nestjs/common";
import { JsonObject, JsonValue } from "../../shared/types/json.type";

@Injectable()
export class DatasetNormalizerService {
  normalize(rawDataset: unknown): JsonObject[] {
    if (!Array.isArray(rawDataset)) {
      throw new Error("Dataset response must be an array");
    }

    return rawDataset.map((record, index) =>
      this.normalizeRecord(record, index),
    );
  }

  private normalizeRecord(record: unknown, index: number): JsonObject {
    if (!this.isJsonObject(record)) {
      throw new Error(`Dataset record at index ${index} must be an object`);
    }

    return record;
  }

  private isJsonObject(value: unknown): value is JsonObject {
    return (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      this.hasJsonValues(value)
    );
  }

  private hasJsonValues(value: object): value is JsonObject {
    return Object.values(value).every((propertyValue) =>
      this.isJsonValue(propertyValue),
    );
  }

  private isJsonValue(value: unknown): value is JsonValue {
    if (value === null) {
      return true;
    }

    if (["string", "number", "boolean"].includes(typeof value)) {
      return true;
    }

    if (Array.isArray(value)) {
      return value.every((item) => this.isJsonValue(item));
    }

    return this.isJsonObject(value);
  }
}
