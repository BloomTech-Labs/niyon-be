module.exports = {
  // connection: 'postgres://joe:123@localhost/graphqlknex',
  dev: {
    client: 'pg',
    connection: {
      database: process.env["DB_SECRET "],
      port: 5432,
      user: process.env["HEROKU_USER "],
      password: process.env["DB_PASSWORD "] //filename: './db/data.db3', // need to create db
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


