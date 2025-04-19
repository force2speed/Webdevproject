#!/bin/bash
# Update and install necessary packages
sudo apt-get update
sudo apt-get install -y nodejs npm git

# Clone the repository
git clone https://github.com/force2speed/Webdevproject.git

# Navigate to the backend folder
cd Webdevproject/quizhub-backend

# Install Node.js dependencies
npm install

# Start the server
npm start
