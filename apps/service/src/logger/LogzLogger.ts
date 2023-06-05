import {
  createLogger,
  ILoggerOptions as LogzOptions,
  ILogzioLogger,
} from "logzio-nodejs";
import { Logger } from "./Logger";

export interface LogzLoggerConfig extends LogzOptions {
  isVerbose: boolean;
}

export class LogzLogger implements Logger {
  private logger: ILogzioLogger;

  constructor(private opts: LogzLoggerConfig) {
    this.logger = createLogger(opts);
    console.debug("Logzio Logger initialized");
  }

  warn(warnmsg: string, obj?: object): void {
    this.log({
      ...obj,
      warnmsg,
    });
  }

  private close() {
    this.logger.sendAndClose();
  }

  public log(obj: object, flush = false): void {
    this.logger.log(JSON.stringify(obj));
    flush && this.close();
  }

  public verbose(obj: object): void {
    if (this.opts.isVerbose) {
      this.log(obj);
    }
  }

  public error(errmsg: string, obj: object): void {
    this.log(
      {
        ...obj,
        errmsg,
      },
      true
    );
  }
}
