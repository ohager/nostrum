import { NextResponse } from "next/server";
import { getLedger } from "../getLedger";
import { getSigningKeys } from "../getSigningKeys";
import { Address, TransactionId } from "@signumjs/core";
import { Amount } from "@signumjs/util";

export async function POST(request: Request) {
  try {
    const {
      signumPublicKey,
      aliasId,
      referencedTransactionFullHash,
      nodeHost,
    } = await request.json();

    if (!aliasId || !signumPublicKey || !referencedTransactionFullHash) {
      return NextResponse.json(
        {},
        { status: 400, statusText: "Invalid Parameters" }
      );
    }

    const ledger = getLedger(nodeHost);
    const { signPrivateKey, publicKey } = getSigningKeys();
    const address = Address.fromPublicKey(signumPublicKey);
    const { fullHash, transaction } = (await ledger.alias.sellAlias({
      aliasId,
      referencedTransactionFullHash,
      senderPublicKey: publicKey,
      senderPrivateKey: signPrivateKey,
      recipientId: address.getNumericId(),
      recipientPublicKey: address.getPublicKey(),
      amountPlanck: "0",
      feePlanck: Amount.fromSigna(0.01).getPlanck(),
    })) as TransactionId;

    return NextResponse.json({ transaction, fullHash }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
