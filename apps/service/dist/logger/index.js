"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LoggerType = void 0;
const LogzLogger_1 = require("./LogzLogger");
const DevLogger_1 = require("./DevLogger");
const AggregatedLogger_1 = require("./AggregatedLogger");
const config_1 = require("../config");
__exportStar(require("./LogzLogger"), exports);
__exportStar(require("./DevLogger"), exports);
__exportStar(require("./Logger"), exports);
var LoggerType;
(function (LoggerType) {
  LoggerType[(LoggerType["Dev"] = 0)] = "Dev";
  LoggerType[(LoggerType["LogzIO"] = 1)] = "LogzIO";
  LoggerType[(LoggerType["Aggregated"] = 2)] = "Aggregated";
})(LoggerType || (exports.LoggerType = LoggerType = {}));
const createLogger = ({ config, type }) => {
  switch (type) {
    case LoggerType.LogzIO:
      return new LogzLogger_1.LogzLogger(config);
    case LoggerType.Dev:
      return new DevLogger_1.DevLogger();
    case LoggerType.Aggregated:
      return new AggregatedLogger_1.AggregatedLogger([
        new DevLogger_1.DevLogger(),
        new LogzLogger_1.LogzLogger(config),
      ]);
    default:
      throw new Error(`Unknown Logger Type: ${type}`);
  }
};
exports.logger =
  config_1.config.get("loggerType") === "full"
    ? createLogger({
        type: LoggerType.Aggregated,
        config: {
          isVerbose: config_1.config.get("logzio.isVerbose"),
          token: config_1.config.get("logzio.token"),
          extraFields: {
            app: "nostrum-service",
            testnet: config_1.config.get("isTestnet"),
          },
        },
      })
    : createLogger({
        type: LoggerType.Dev,
        config: null,
      });
