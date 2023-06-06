# DeNAVAS - Decentralized Nostr Accounts Validation and Search

This project is about solving some issues with Nostr Accounts.

- Users must own/have access to an internet domain to get verified
- Users can't be searched easily between relays
- Users can get impersonated

This project provides a possible solution for all these issues.
The main application is a web app that allows users to claim a unique name, which is being stored
on the [Signum blockchain](https://signum.network). The name is part of a so-called "Alias", a user owned
on-chain data container - identified by an unique custom name - which is even updatable. The user has full sovereignty over this "Alias", as it
is only him who owns and can change its content. As it is on a globally distributed, public blockchain,
the user can be searched without any centralizing instance and completely independent of relays.

## What's inside this repo?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `apps/web`: Web App to claim Nostr Account Names
- `apps/service`: Backend Chain Listener to enable chained transactions, i.e. transfers alias to claiming user
- `packages/nostrum-name-search` - Reusable Web Component for User Search (framework agnostic)
