module.exports = {
  // connection: 'postgres://joe:123@localhost/graphqlknex',
  dev: {
    client: 'sqlite3',
    connection: {
      filename: './db/data.db3', // need to create db
      },
    useNullAsDefault: true,

  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done)
    }
  }
}
};


