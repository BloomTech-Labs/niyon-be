const { GraphQLServer } = require('graphql-yoga');

// set typeDefs below to use .graphql files
// const typeDefs = importSchema('./schema/schema.graphql');
const server = new GraphQLServer({
   //schema
   //resolvers
   //context => models
});

server.start(({url}) => console.log(`-- server running on ${url} --`));