#!/bin/bash
git pull
cd apps/service
yarn install
yarn build
pm2 restart pm2.config.js
