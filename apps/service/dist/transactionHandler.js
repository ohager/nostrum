"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionHandler = void 0;
const core_1 = require("@signumjs/core");
const logger_1 = require("./logger");
const crypto_1 = require("@signumjs/crypto");
const config_1 = require("./config");
const util_1 = require("@signumjs/util");
/*
1. Check if transaction is an AliasAssignment and belongs to certain Alias Issuer
2. Parse Alias Data and check if it is in expected format
3. Transfers Alias to the Claiming Account
 */
function createTransactionHandler(ledger) {
  const { publicKey, signPrivateKey, agreementPrivateKey } = (0,
  crypto_1.generateMasterKeys)(config_1.config.get("senderSecret"));
  const senderId = core_1.Address.fromPublicKey(publicKey).getNumericId();
  return async function transactionHandler(tx) {
    const isRelevantTransaction =
      tx.sender === senderId &&
      tx.type === core_1.TransactionType.Arbitrary &&
      tx.subtype === core_1.TransactionArbitrarySubtype.AliasAssignment;
    if (!isRelevantTransaction) return;
    try {
      const aliasName = tx.attachment.alias;
      logger_1.logger.log({
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
      const recipient = core_1.Address.fromPublicKey(recipientPk);
      logger_1.logger.log({
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
        amountPlanck: "0",
        feePlanck: util_1.Amount.fromSigna(0.02).getPlanck(),
        deadline: 60,
      });
      await ledger.message.sendMessage({
        recipientId: recipient.getNumericId(),
        recipientPublicKey: recipient.getPublicKey(),
        senderPublicKey: publicKey,
        senderPrivateKey: signPrivateKey,
        message: `Congratz, you just got your Signum Alias. Your Nostr NIP05 Name is [${aliasName}@signum.network] and/or [${aliasName}@nostrum.network]`,
        messageIsText: true,
        feePlanck: util_1.Amount.fromSigna(0.01).getPlanck(),
        deadline: 60,
      });
      logger_1.logger.log({
        msg: "Transferred Alias successfully",
        alias: aliasName,
      });
    } catch (e) {
      logger_1.logger.error(e.message);
    }
  };
}
exports.createTransactionHandler = createTransactionHandler;
