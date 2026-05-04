import { Global, Module } from "@nestjs/common";
import { APP_CONFIG } from "../constants/app.constants";
import { loadAppConfig } from "./load-app-config";

@Global()
@Module({
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: loadAppConfig,
    },
  ],
  exports: [APP_CONFIG],
})
export class ConfigModule {}
