module.exports = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "mysecretpassword",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "49784"),
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
