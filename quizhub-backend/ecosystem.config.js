module.exports = {
    apps: [
      {
        name: "quizhub-backend",
        script: "server.js",
        env: {
          PORT: 8081,
          NODE_ENV: "production",
          MONGODB_URI: "mongodb+srv://dhruvdhoundiyal:XtNVFubmzJkaMFMy@quizhubcluster.k7gwuyt.mongodb.net/QUIZHUB?retryWrites=true&w=majority&appName=QUIZHUBCLUSTER"
        }
      }
    ]
  };