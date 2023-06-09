interface CreateAliasArgs {
  name: string;
  nostrPublicKey: string;
  nostrRelays: string[];
  signumPublicKey: string;
  nodeHost: string;
}

export async function createAlias(args: CreateAliasArgs) {
  const response = await fetch("/api/createAlias", {
    method: "POST",
    body: JSON.stringify(args),
  });
  if (response.ok) {
    const { fullHash, transaction } = await response.json();
    return {
      aliasId: transaction,
      fullHash,
    };
  } else {
    const { error } = await response.json();
    throw new Error(error);
  }
}
