import { Logger } from "./Logger";
import chalk from "chalk";

const ts = chalk.yellow;
const info = chalk.bold.blue;
const warn = chalk.bold.yellowBright;
const debug = chalk.bold.green;
const error = chalk.bold.red;

export class DevLogger implements Logger {
  constructor() {
    console.debug("Dev Logger initialized");
  }

  public log(obj: object): void {
    console.info(ts(`[${new Date().toISOString()}]`), info(" [INFO]"), obj);
  }

  public verbose(obj: object): void {
    console.debug(ts(`[${new Date().toISOString()}]`), debug(" [DEBUG]"), obj);
  }

  public warn(warnmsg: string): void {
    console.warn(
      ts(`[${new Date().toISOString()}]`),
      warn(" [WARN]"),
      warn(warnmsg)
    );
  }

  public error(errmsg: string, obj: object): void {
    console.debug(
      ts(`[${new Date().toISOString()}]`),
      error(" [ERROR]"),
      error(errmsg),
      "\n",
      obj
    );
  }
}
