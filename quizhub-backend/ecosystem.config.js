module.exports = {
    apps: [{
      name: "quizhub-backend",
      script: "server.js",
      args: "--port=8081", // Force port via CLI argument
      env: {
        NODE_ENV: "production",
        MONGODB_URI:  "mongodb://dhruvdhoundiyal:XtNVFubmzJkaMFMy@quizhubcluster.k7gwuyt.mongodb.net:27017/QUIZHUB?retryWrites=true&w=majority", // Your real URI
      },
      env_production: {
        PORT: 8081 // Secondary enforcement
      }
    }]
  }
 