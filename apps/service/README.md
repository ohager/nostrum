# Denavas Backend Service

This service looks if an Alias Claim Request is available and processes it.

## Deployment

### Installation

**Prerequisites**

- NodeJS 16+ installed (recommended to use nvm)
- Having `yarn` installed (`npm i -g yarn`)
- Having `pm2` installed
- Signum Node installed (optional, but recommended)

For deployment on your server run the following commands:

```bash
git clone --no-checkout --depth=1 https://github.com/ohager/denavas.git
git sparse-checkout init --cone
git sparse-checkout set apps/service
cd apps/service
cp .env.example .env
yarn install --prod
yarn build
```

And then set up the `.env` file accordingly,

## Run

The service is meant to run using `pm2`

Just run

```
pm2 start pm2.config.js
```

### Update

Once set up as in [Installation](#installation) you only run

```
./update-service.sh
```
