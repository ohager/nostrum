interface TransferAliasArgs {
  aliasId: string;
  signumPublicKey: string;
  referencedTransactionFullHash: string;
  nodeHost: string;
}

interface TransferAliasResponse {
  transaction: string;
  fullHash: string;
}
export async function transferAlias(args: TransferAliasArgs) {
  const response = await fetch("/api/transferAlias", {
    method: "POST",
    body: JSON.stringify(args),
  });
  if (response.ok) {
    return (await response.json()) as Promise<TransferAliasResponse>;
  } else {
    throw new Error("Failed transferring Alias");
  }
}
