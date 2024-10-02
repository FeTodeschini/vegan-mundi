module.exports = {
    apps: [
      {
        name: "server",
        script: "index.js",
        cwd: "/var/www/vegan-mundi/server",
        instances: 1,
        autorestart: true,
        watch: false,
        env_test: {
          NODE_ENV: "test",
        },
        env_prod: {
          NODE_ENV: "production",
        },
      },
    ],
  };