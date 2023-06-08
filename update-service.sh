#!/bin/bash
git pull
cd apps/service
pm2 restart pm2.config.js
