module.exports = {
    apps: [
      {
        name: 'quizhub-backend',
        script: './server.js',
        env: {
          NODE_ENV: 'production',
          PORT: 8081,
          MONGODB_URI: 'mongodb+srv://dhruvdhoundiyal:XtNVFubmzJkaMFMy@quizhubcluster.k7gwuyt.mongodb.net/QUIZHUB?retryWrites=true&w=majority&appName=QUIZHUBCLUSTER'
        }
      }
    ]
  };
  