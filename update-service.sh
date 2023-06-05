#!/bin/bash
rm -rf yarn.lock
git pull
yarn install --prod
cd apps/service
yarn build
echo "To restart service type:"
echo "pm2 restart pm2.config.js"
