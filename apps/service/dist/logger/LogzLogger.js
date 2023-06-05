"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogzLogger = void 0;
const logzio_nodejs_1 = require("logzio-nodejs");
class LogzLogger {
  constructor(opts) {
    this.opts = opts;
    this.logger = (0, logzio_nodejs_1.createLogger)(opts);
    console.debug("Logzio Logger initialized");
  }
  warn(warnmsg, obj) {
    this.log({
      ...obj,
      warnmsg,
    });
  }
  close() {
    this.logger.sendAndClose();
  }
  log(obj, flush = false) {
    this.logger.log(JSON.stringify(obj));
    flush && this.close();
  }
  verbose(obj) {
    if (this.opts.isVerbose) {
      this.log(obj);
    }
  }
  error(errmsg, obj) {
    this.log(
      {
        ...obj,
        errmsg,
      },
      true
    );
  }
}
exports.LogzLogger = LogzLogger;
