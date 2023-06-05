"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatedLogger = void 0;
class AggregatedLogger {
  constructor(loggers) {
    this.loggers = loggers;
    console.debug("Aggregated Logger initialized:");
    loggers.forEach((l) => {
      console.debug(l.constructor.name);
    });
  }
  log(obj, flush) {
    this.loggers.forEach((l) => {
      l.log(obj, flush);
    });
  }
  verbose(obj) {
    this.log(obj);
  }
  warn(warnmsg, obj) {
    this.loggers.forEach((l) => {
      l.warn(warnmsg, obj);
    });
  }
  error(errmsg, obj) {
    this.loggers.forEach((l) => {
      l.error(errmsg, obj);
    });
  }
}
exports.AggregatedLogger = AggregatedLogger;
