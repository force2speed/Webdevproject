set -ex
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs git
APP_DIR="/home/$(whoami)/quizhub-backend"
if [ ! -d "$APP_DIR" ]; then
  git clone https://github.com/force2speed/Webdevproject.git "$APP_DIR"
fi
cd "$APP_DIR"
git pull origin main || true
npm install
if [ -f "config.env" ]; then
  cp config.env .env
fi
fuser -k 8081/tcp || true
nohup node server.js --port 8081 > app.log 2>&1 &
sleep 5
if ! pgrep -f "node server.js --port 8081" > /dev/null; then
  echo "❌ Application failed to start!"
  cat app.log
  exit 1
fi
echo "✅ Application started successfully on port 8081"
