#!/bin/bash
set -ex

# Install dependencies
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Clone repository
APP_DIR="/home/$(whoami)/quizhub-backend"
git clone  https://github.com/force2speed/Webdevproject.git $APP_DIR
cd $APP_DIR

# Install dependencies
npm install

# Set environment variables
if [ -f "config.env" ]; then
  cp config.env .env
fi

# Start application
nohup node server.js --port 8081 > app.log 2>&1 &

# Verify startup
sleep 5
if ! pgrep -f "node server.js --port 8081" > /dev/null; then
  echo "Application failed to start!"
  cat app.log
  exit 1
fi

echo "Application started successfully on port 8081"