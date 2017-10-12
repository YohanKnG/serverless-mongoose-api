(function service() {
  const connectionString =
    process.env.STAGE === "production" ? "prod:db" : "dev:db";

  module.exports = {
    DB_CONFIG: {
      CONNECTIONSTRING: connectionString
    },

    AWS_CONFIG: {
      REGION: "us-east-1"
    }
  };
})();
