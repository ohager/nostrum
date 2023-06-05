"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const convict_1 = __importDefault(require("convict"));
exports.config = (0, convict_1.default)({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  nodeHost: {
    doc: "The Node Url to use",
    format: String,
    default: "http://localhost:6876",
    env: "NODE_HOST",
  },
  signumTld: {
    doc: "Signum TLD to ue",
    format: String,
    default: "signum",
    env: "SIGNUM_TLD",
  },
  isTestnet: {
    doc: "Flag to check if it is running in testnet",
    format: Boolean,
    default: true,
    env: "IS_TESTNET",
  },
  senderSecret: {
    doc: "Secret of sending account",
    format: String,
    default: "",
    env: "GIVEAWAY_ACCOUNT_SECRET",
  },
  loggerType: {
    format: ["console", "full"],
    default: "console",
    env: "LOGGER_TYPE",
  },
  logzio: {
    token: {
      env: "LOGZIO_TOKEN",
      format: String,
      default: "",
    },
    isVerbose: {
      env: "LOGZIO_VERBOSE",
      format: Boolean,
      default: false,
    },
  },
});
