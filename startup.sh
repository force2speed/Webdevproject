#!/bin/bash
sudo apt-get update
sudo apt-get install -y nodejs npm git
git clone https://github.com/force2speed/Webdevproject/quizhub-backend.git
cd quizhub-backend
npm install
npm start