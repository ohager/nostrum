module.exports = {
  apps: [
    {
      name: "denavas-service",
      script: "./dist/index.js",
      node_args: "-r dotenv/config",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
