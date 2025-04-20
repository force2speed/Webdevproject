#!/bin/bash
set -ex

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y git

# Create app directory
APP_DIR="/home/$(whoami)/quizhub-backend"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# ----------------------------
# METHOD 1: Clone from GitHub (Recommended)
# ----------------------------
git clone https://github.com/yourusername/quizhub-backend.git .
npm install

# ----------------------------
# OR METHOD 2: Copy from local machine using gcloud
# (Run this from your local machine first)
# ----------------------------
# gcloud compute instances add-metadata INSTANCE_NAME \
#   --metadata-from-file quizhub-backend=./quizhub-backend \
#   --zone=asia-south1-a

# Then in startup script:
# sudo cp -r /quizhub-backend "$APP_DIR"
# cd "$APP_DIR"
# npm install

# Set environment variables
if [ -f "config.env" ]; then
  cp config.env .env
fi

# Start the application
nohup node server.js --port 8081 > app.log 2>&1 &

# Verify application started
sleep 5
if ! pgrep -f "node server.js --port 8081" > /dev/null; then
  echo "Application failed to start!"
  cat app.log
  exit 1
fi

echo "Application started successfully on port 8081"