interface CreateAliasArgs {
  name: string;
  nostrPublicKey: string;
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
    throw new Error("Failed creating Alias");
  }
}
