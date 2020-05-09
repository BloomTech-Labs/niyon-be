const { GraphQLServer,  } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { Mutation } = require('./resolvers/index');
const helpers = require('./models/index');

const resolvers = {
    Mutation
}
// set typeDefs below to use .graphql files
// const typeDefs = importSchema('./schema/schema.graphql');
const server = new GraphQLServer({
   typeDefs: './schema/schema.graphql',
   resolvers,
   context: request => {
       return {
           ...request,
           helpers
       }
   }
});

server.start()
    .then(res => {
        console.log(`Server is running on http://localhost:4000`)
    })
    .catch(err => {
        console.log(`errorMessage: ${err}`)
    });