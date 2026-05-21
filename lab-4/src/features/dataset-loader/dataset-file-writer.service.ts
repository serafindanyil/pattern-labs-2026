import { Injectable } from "@nestjs/common";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { JsonObject } from "../../shared/types/json.type";

@Injectable()
export class DatasetFileWriterService {
  async writeRecords(filePath: string, records: JsonObject[]): Promise<void> {
    await mkdir(dirname(filePath), { recursive: true });

    const content = records.map((record) => JSON.stringify(record)).join("\n");
    await writeFile(filePath, `${content}\n`, "utf8");
  }
}
