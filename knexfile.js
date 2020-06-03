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
    client: "pg",
    connection: {
      database: "ec2-18-210-214-86.compute-1.amazonaws.com",
      user: "lqtdmycffkmufv",
      password: "e5cd313f3acb6780ddf83a3dffe9eee55d27b3fefc57163f8b559401b6418c8f",
      port: 5432,
    },

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
