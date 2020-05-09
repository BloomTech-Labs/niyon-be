const { addDirectiveResolveFunctionsToSchema } = require('graphql-directive');
const { defaultFieldResolver } = require('graphql');
const schema = require('./schema.graphql');


const auth = addDirectiveResolveFunctionsToSchema(schema, {
    authToken(resolve, directiveArgs, obj, context, info) {
        if (!context.isAuth)
            throw new Error(`You must sign in to access ${info.field}`)
        return resolve()
    }
})

module.exports = auth;
