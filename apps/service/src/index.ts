/* eslint-disable turbo/no-undeclared-env-vars */
import { ChainWalker } from "signum-chain-walker";
import { createTransactionHandler } from "./transactionHandler";
import { config } from "./config";
import { logger } from "./logger";

(async () => {
  try {
    const nodeHost = config.get("nodeHost");
    const walker = new ChainWalker({
      nodeHost,
    });
    logger.log({
      msg: `Starting Nostrum Listener Service for host ${nodeHost}...`,
    });
    walker.onTransaction(createTransactionHandler(walker.ledgerClient));
    await walker.listen();
  } catch (e: any) {
    logger.error(e.message);
  }
})();
