export interface Logger {
  log(obj: object, flush?: boolean): void;
  verbose(obj: object): void;
  warn(warnmsg: string, obj?: object): void;
  error(errmsg: string, obj?: object): void;
}
