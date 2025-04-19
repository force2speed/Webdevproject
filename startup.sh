#!/bin/bash
# Exit immediately if any command fails
set -e

# Update and install necessary packages
sudo apt-get update -y
sudo apt-get install -y nodejs npm git

# Install latest Node.js if needed
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone the repository
git clone https://github.com/force2speed/Webdevproject.git

# Navigate to the backend folder
cd Webdevproject/quizhub-backend

# Install dependencies
npm install --production

# Set environment variables
cat > .env <<EOF
PORT=8081
NODE_ENV=production
MONGODB_URI=mongodb+srv://dhruvdhoundiyal:XtNVFubmzJkaMFMy@quizhubcluster.k7gwuyt.mongodb.net/QUIZHUB?retryWrites=true&w=majority&appName=QUIZHUBCLUSTER
EOF

# Install PM2 globally
sudo npm install -g pm2

# Start the application
pm2 start server.js --name "quizhub-backend"

# Configure PM2 to start on system boot
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER
pm2 save