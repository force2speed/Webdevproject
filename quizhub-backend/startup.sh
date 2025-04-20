#!/bin/bash
set -ex

# Install dependencies
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs git

# Clone repository
APP_DIR="/home/$(whoami)/quizhub-backend"

# Only clone if it doesn't already exist
if [ ! -d "$APP_DIR" ]; then
  git clone https://github.com/force2speed/Webdevproject.git "$APP_DIR"
fi

cd "$APP_DIR"

# Pull latest changes (optional if you're okay with fixed code)
git pull origin main || true

# Install Node.js dependencies
npm install

# Set environment variables
if [ -f "config.env" ]; then
  cp config.env .env
fi

# Kill any previous process using port 8081
fuser -k 8081/tcp || true

# Start application
nohup node server.js --port 8081 > app.log 2>&1 &

# Verify startup
sleep 5
if ! pgrep -f "node server.js --port 8081" > /dev/null; then
  echo "❌ Application failed to start!"
  cat app.log
  exit 1
fi

echo "✅ Application started successfully on port 8081"
