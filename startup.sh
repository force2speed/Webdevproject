#!/bin/bash
set -e  # Exit on error

# Install dependencies
sudo apt update
sudo apt install -y git nodejs npm

# Fix permissions and navigate
sudo chown -R $(whoami):$(whoami) /Webdevproject/
cd /Webdevproject/quizhub-backend

# Install and start
npm install
PORT=8081 pm2 start server.js --name quizhub-backend
pm2 save
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $(whoami) --hp /home/$(whoami)