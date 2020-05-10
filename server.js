const { GraphQLServer,  } = require('graphql-yoga');
const resolvers = require('./resolvers/index');
const helpers = require('./models/index');

//creating a graphql-yoga server with...
//(1) typeDefs from our schema.grqphql file in the schema folder
//(2) resolvers from our index file in the resolvers folder
//(3) adding the request object into our context
//(4) adding our helper models from the index file in our models folder
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