require('dotenv').config();


module.exports = {
  // connection: 'postgres://joe:123@localhost/graphqlknex',
  dev: {
    
    client: 'pg',
    connection: {
    database: process.env.LOCAL_DB, //process.env["LOCAL_DB "],
    user: process.env.LOCAL_USER, //process.env["LOCAL_USER "],
    password: process.env.LOCAL_PASSWORD, //process.env["LOCAL_PASSWORD "],
    port: 5432,
    // connection: {
    //   //process.env["LOCAL_PASSWORD"], //filename: './db/data.db3', // need to create db
    // },
    },
    useNullAsDefault: true,

  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  // pool: {
  //   afterCreate: (conn, done) => {
  //     conn.run("PRAGMA foreign_keys = ON", done)
  //   }}
  
  },
  test: {
   client: "sqlite3",
   connection: {
    filename: './db/testNiyon.db3'
  },
  useNullAsDefault: true,
    
    

    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/test/seeds'
    },
  },
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run("PRAGMA foreign_keys = ON", done)
    //   }}

  
    prod: {
    client: 'pg',
    connection: {
      database: process.env["DATABASE"],
      user: process.env["USER_HEROKU"],
      password: process.env["PASSWORD_HEROKU"],
      port: 5432
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    // pool: {
    //   afterCreate: (conn, done) => {
    //     conn.run("PRAGMA foreign_keys = ON", done)
    //   }}
  }
};


