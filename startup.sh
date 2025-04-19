#!/bin/bash
set -e  # Exit on error

# Install Node.js and npm
sudo apt update
sudo apt install -y git nodejs npm

# Install PM2 globally
sudo npm install -g pm2

# Ensure PM2 is in PATH
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
source ~/.bashrc

# Navigate to app directory
cd /Webdevproject/quizhub-backend

# Install app dependencies
npm install

# Start application
PORT=8081 pm2 start server.js --name quizhub-backend
pm2 save

# Configure PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $(whoami) --hp /home/$(whoami)