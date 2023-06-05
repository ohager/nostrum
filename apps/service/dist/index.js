"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable turbo/no-undeclared-env-vars */
const signum_chain_walker_1 = require("signum-chain-walker");
const transactionHandler_1 = require("./transactionHandler");
const config_1 = require("./config");
const logger_1 = require("./logger");
(async () => {
  try {
    const nodeHost = config_1.config.get("nodeHost");
    const walker = new signum_chain_walker_1.ChainWalker({
      nodeHost,
    });
    logger_1.logger.log({
      msg: `Starting DeNAVAS Listener Service for host ${nodeHost}...`,
    });
    walker.onTransaction(
      (0, transactionHandler_1.createTransactionHandler)(walker.ledgerClient)
    );
    await walker.listen();
  } catch (e) {
    logger_1.logger.error(e.message);
  }
})();
