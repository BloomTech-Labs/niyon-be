module.exports = {
  // connection: 'postgres://joe:123@localhost/graphqlknex',
  dev: {
    client: 'pg',
    connection: {
      database: 'dbname', // need to create db
      user: 'joe',
      password: '123'
    },
    useNullAsDefault: true
  },
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
};


