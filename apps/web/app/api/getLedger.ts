/* eslint-disable turbo/no-undeclared-env-vars */
import { LedgerClientFactory } from "@signumjs/core";

export function getLedger(
  nodeHost = process.env.NEXT_PUBLIC_DEFAULT_NODE || ""
) {
  return LedgerClientFactory.createClient({
    nodeHost,
  });
}
