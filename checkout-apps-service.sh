#! /env/bash
git checkout sparse-checkout init --cone
get checkout sparse-checkout set apps/service
git checkout main

echo "Apps/Service configured for sparse checkout"
