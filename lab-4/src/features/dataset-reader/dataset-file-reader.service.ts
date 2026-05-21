import { Injectable } from "@nestjs/common";
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline/promises";

@Injectable()
export class DatasetFileReaderService {
  async *readLines(filePath: string): AsyncGenerator<string> {
    const input = createReadStream(filePath, { encoding: "utf8" });
    const reader = createInterface({
      input,
      crlfDelay: Infinity,
    });

    try {
      for await (const line of reader) {
        if (line.length > 0) {
          yield line;
        }
      }
    } finally {
      reader.close();
      input.destroy();
    }
  }
}
