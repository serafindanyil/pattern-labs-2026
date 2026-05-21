import { Injectable } from "@nestjs/common";
import { OutputStrategy } from "../output-strategy.interface";

@Injectable()
export class ConsoleOutputStrategy implements OutputStrategy {
  open(): Promise<void> {
    return Promise.resolve();
  }

  write(line: string): Promise<void> {
    process.stdout.write(`${line}\n`);

    return Promise.resolve();
  }

  close(): Promise<void> {
    return Promise.resolve();
  }
}
