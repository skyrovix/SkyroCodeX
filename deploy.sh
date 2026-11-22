#!/bin/bash
# ==============================================================================
# SkyroCodeX - Automated Production Deployment Script for Contabo VPS
# ==============================================================================

set -e

echo "🚀 [1/5] Pulling latest code from GitHub (main)..."
git pull origin main

echo "📦 [2/5] Installing project dependencies..."
npm install --legacy-peer-deps

echo "⚙️ [3/5] Building Next.js production build..."
npm run build

echo "🔄 [4/5] Reloading application via PM2 with zero downtime..."
if pm2 describe skyrocodex > /dev/null 2>&1; then
    pm2 reload skyrocodex
else
    pm2 start npm --name "skyrocodex" -- start -- -p 3000
    pm2 save
fi

echo "✅ [5/5] SkyroCodeX deployed successfully and running live!"
pm2 status skyrocodex

