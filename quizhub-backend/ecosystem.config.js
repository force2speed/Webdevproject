module.exports = {
    apps: [
      {
        name: "quizhub-backend",
        script: "server.js",
        env: {
          PORT: 8081,
          NODE_ENV: "production",
          MONGODB_URI: "mongodb://dhruvdhoundiyal:XtNVFubmzJkaMFMy@quizhubcluster.k7gwuyt.mongodb.net:27017/QUIZHUB?retryWrites=true&w=majority"
        }
      }
    ]
  };