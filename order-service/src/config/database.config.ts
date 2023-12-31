module.exports = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "RAQmEgU4HJ",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
