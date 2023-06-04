import { generateMasterKeys } from "@signumjs/crypto";
import * as process from "process";

export function getSigningKeys() {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const seed = process.env.NEXT_SERVER_GIVEAWAY_ACCOUNT_SECRET || "";
  if (!seed) {
    throw new Error("NEXT_SERVER_GIVEAWAY_ACCOUNT_SECRET not declared");
  }
  const { signPrivateKey, publicKey } = generateMasterKeys(seed);
  return {
    signPrivateKey,
    publicKey,
  };
}
