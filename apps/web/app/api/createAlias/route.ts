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

function keepRelaysWithinLimit(relays: string[]): string[] {
  const Limit = 750;
  let count = 0;
  const ret = [];
  for (let r of relays) {
    if (count + r.length <= Limit) {
      ret.push(r);
      count += r.length;
    }
  }
  return ret;
}

export async function POST(request: Request) {
  try {
    const { nostrPublicKey, signumPublicKey, name, nodeHost, nostrRelays } =
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
    let aliasURI = JSON.stringify({
      vs: 1,
      ac: address.getNumericId(),
      xnostr: nostrPublicKey,
      xnsrel: keepRelaysWithinLimit(nostrRelays),
      xpk: signumPublicKey,
    });

    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const tld = process.env.NEXT_PUBLIC_SIGNUM_TLD || "nostr";
    const { aliases } = await ledger.alias.getAliases({
      accountId: address.getNumericId(),
      tld,
    });

    if (
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      aliases.length > Number(process.env.NEXT_SERVER_MAX_ALLOWED_ALIASES) ||
      10
    ) {
      throw new Error("Max. Aliases per account reached!");
    }

    const { fullHash, transaction } = (await ledger.alias.setAlias({
      aliasName: name,
      tld,
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
