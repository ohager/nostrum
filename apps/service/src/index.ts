/* eslint-disable turbo/no-undeclared-env-vars */
import { ChainWalker } from "signum-chain-walker";
import { transactionHandler } from "./transansactionHandler";
import { config } from "./config";
const walker = new ChainWalker({
  nodeHost: config.get("nodeHost"),
}).onTransaction(transactionHandler);

(async () => {
  try {
    await walker.listen();
  } catch (e) {
    console.log("Error", e);
  }
})();
