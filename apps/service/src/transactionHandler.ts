import {
  Address,
  Ledger,
  Transaction,
  TransactionArbitrarySubtype,
  TransactionType,
} from "@signumjs/core";
import { logger } from "./logger";
import { generateMasterKeys } from "@signumjs/crypto";
import { config } from "./config";
import { Amount } from "@signumjs/util";

/*
1. Check if transaction is an AliasAssignment and belongs to certain Alias Issuer
2. Parse Alias Data and check if it is in expected format
3. Transfers Alias to the Claiming Account
 */
export function createTransactionHandler(ledger: Ledger) {
  const { publicKey, signPrivateKey, agreementPrivateKey } = generateMasterKeys(
    config.get("senderSecret")
  );
  const senderId = Address.fromPublicKey(publicKey).getNumericId();
  return async function transactionHandler(tx: Transaction) {
    const isRelevantTransaction =
      tx.sender === senderId &&
      tx.type === TransactionType.Arbitrary &&
      tx.subtype === TransactionArbitrarySubtype.AliasAssignment;

    if (!isRelevantTransaction) return;

    try {
      const aliasName = tx.attachment.alias;
      logger.log({
        msg: "Found alias",
        txId: tx.transaction,
        alias: aliasName,
        payload: tx.attachment,
      });
      const aliasContent = tx.attachment.uri
        ? JSON.parse(tx.attachment.uri)
        : "";
      if (!aliasContent) {
        return;
      }
      const npub = aliasContent.xnostr;
      const recipientPk = aliasContent.xpk;

      if (!npub || !recipientPk) {
        throw new Error("'xnostr' and 'xpk' are required!");
      }

      const recipient = Address.fromPublicKey(recipientPk);

      logger.log({
        msg: "Transferring Alias",
        alias: aliasName,
        recipient: recipient.getNumericId(),
      });
      await ledger.alias.sellAlias({
        recipientId: recipient.getNumericId(),
        recipientPublicKey: recipient.getPublicKey(),
        aliasId: tx.transaction,
        senderPublicKey: publicKey,
        senderPrivateKey: signPrivateKey,
        amountPlanck: "0", // transfer
        feePlanck: Amount.fromSigna(0.02).getPlanck(),
        deadline: 60,
      });
      await ledger.message.sendMessage({
        recipientId: recipient.getNumericId(),
        recipientPublicKey: recipient.getPublicKey(),
        senderPublicKey: publicKey,
        senderPrivateKey: signPrivateKey,
        message: `Congratz, you just got your Signum Alias. Your Nostr NIP05 Name is [${aliasName}@signum.network]`,
        messageIsText: true,
        feePlanck: Amount.fromSigna(0.01).getPlanck(),
        deadline: 60,
      });
      logger.log({
        msg: "Transferred Alias successfully",
        alias: aliasName,
      });
    } catch (e: any) {
      logger.error(e.message);
    }
  };
}
