"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const ts = chalk_1.default.yellow;
const info = chalk_1.default.bold.blue;
const warn = chalk_1.default.bold.yellowBright;
const debug = chalk_1.default.bold.green;
const error = chalk_1.default.bold.red;
class DevLogger {
  constructor() {
    console.debug("Dev Logger initialized");
  }
  log(obj) {
    console.info(ts(`[${new Date().toISOString()}]`), info(" [INFO]"), obj);
  }
  verbose(obj) {
    console.debug(ts(`[${new Date().toISOString()}]`), debug(" [DEBUG]"), obj);
  }
  warn(warnmsg) {
    console.warn(
      ts(`[${new Date().toISOString()}]`),
      warn(" [WARN]"),
      warn(warnmsg)
    );
  }
  error(errmsg, obj) {
    console.debug(
      ts(`[${new Date().toISOString()}]`),
      error(" [ERROR]"),
      error(errmsg),
      "\n",
      obj
    );
  }
}
exports.DevLogger = DevLogger;
