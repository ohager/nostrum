import { NextResponse } from "next/server";
import { getLedger } from "../getLedger";
import * as process from "process";
import { getSigningKeys } from "../getSigningKeys";
import { Amount } from "@signumjs/util";
import { Address, Ledger, TransactionId } from "@signumjs/core";

async function isNodeReachable(ledger: Ledger) {
  try {
    await ledger.network.getMiningInfo();
    return true;
  } catch (e: any) {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { nostrPublicKey, signumPublicKey, name, nodeHost } =
      await request.json();

    if (!nostrPublicKey || !signumPublicKey || !name) {
      return NextResponse.json(
        {},
        { status: 400, statusText: "Invalid Parameters" }
      );
    }

    let ledger = getLedger(nodeHost);
    const isReachable = await isNodeReachable(ledger);
    if (!isReachable) {
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      ledger = getLedger(process.env.NEXT_PUBLIC_DEFAULT_NODE);
    }

    const { signPrivateKey, publicKey } = getSigningKeys();
    const address = Address.fromPublicKey(signumPublicKey);
    const aliasURI = JSON.stringify({
      vs: 1,
      ac: address.getNumericId(),
      xnostr: nostrPublicKey,
      xpk: signumPublicKey,
    });

    const { fullHash, transaction } = (await ledger.alias.setAlias({
      aliasName: name,
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      tld: process.env.NEXT_PUBLIC_SIGNUM_TLD || "nostr",
      aliasURI,
      senderPublicKey: publicKey,
      senderPrivateKey: signPrivateKey,
      feePlanck: Amount.fromSigna(0.2).getPlanck(),
    })) as TransactionId;

    return NextResponse.json({ transaction, fullHash }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
