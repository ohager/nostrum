import { LogzLogger, LogzLoggerConfig } from "./LogzLogger";
import { DevLogger } from "./DevLogger";
import { Logger } from "./Logger";
import { AggregatedLogger } from "./AggregatedLogger";
import { config } from "../config";

export * from "./LogzLogger";
export * from "./DevLogger";
export * from "./Logger";

export enum LoggerType {
  Dev,
  LogzIO,
  Aggregated,
}

export interface LoggerOptions {
  type: LoggerType;
  config: LogzLoggerConfig | null;
}

const createLogger = ({ config, type }: LoggerOptions): Logger => {
  switch (type) {
    case LoggerType.LogzIO:
      return new LogzLogger(config as LogzLoggerConfig);
    case LoggerType.Dev:
      return new DevLogger();
    case LoggerType.Aggregated:
      return new AggregatedLogger([
        new DevLogger(),
        new LogzLogger(config as LogzLoggerConfig),
      ]);
    default:
      throw new Error(`Unknown Logger Type: ${type}`);
  }
};

export const logger =
  config.get("loggerType") === "full"
    ? createLogger({
        type: LoggerType.Aggregated,
        config: {
          isVerbose: config.get("logzio.isVerbose"),
          token: config.get("logzio.token"),
          extraFields: {
            app: "denavas-service",
            testnet: config.get("isTestnet"),
          },
        } as LogzLoggerConfig,
      })
    : createLogger({
        type: LoggerType.Dev,
        config: null,
      });
