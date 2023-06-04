import { Transaction } from "@signumjs/core";

export async function transactionHandler(tx: Transaction) {
  console.log("Transaction incoming", tx.transaction);
  return Promise.resolve();
}
