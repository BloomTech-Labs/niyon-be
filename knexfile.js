require("dotenv").config();

module.exports = {
  dev: {
    client: "pg",
    connection: {
      database: process.env.LOCAL_DB,
      user: process.env.LOCAL_USER,
      password: process.env.LOCAL_PASSWORD,
      port: 5432,
    },
    useNullAsDefault: true,

    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: './db/niyon.db3'

    },
    useNullAsDefault: true,

    seeds: {
      directory: "./db/test/seeds",
    },
    migrations: {
      directory: "./db/migrations",
    },
  },

  prod: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
