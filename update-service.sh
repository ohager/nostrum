#! /env/bash
git pull
cd apps/service
yarn build
pm2 restart pm2.config.js
