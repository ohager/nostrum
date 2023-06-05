import { Logger } from "./Logger";

export class AggregatedLogger implements Logger {
  constructor(private loggers: Logger[]) {
    console.debug("Aggregated Logger initialized:");
    loggers.forEach((l) => {
      console.debug(l.constructor.name);
    });
  }

  public log(obj: object, flush?: boolean): void {
    this.loggers.forEach((l) => {
      l.log(obj, flush);
    });
  }

  public verbose(obj: object): void {
    this.log(obj);
  }

  public warn(warnmsg: string, obj?: object): void {
    this.loggers.forEach((l) => {
      l.warn(warnmsg, obj);
    });
  }

  public error(errmsg: string, obj: object): void {
    this.loggers.forEach((l) => {
      l.error(errmsg, obj);
    });
  }
}
