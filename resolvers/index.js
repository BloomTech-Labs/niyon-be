const Mutation = require('./Mutation');
const Query = require('./Query')

//creating object of resolvers to require in server
const resolvers = {
    Mutation,
    Query
}

module.exports = resolvers