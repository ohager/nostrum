import convict from "convict";

export const config = convict({
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
