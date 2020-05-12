const db = require('../db/config');

module.exports = {
    createUser,
    findBy
}
//helper model to use with registration to insert new user in db
async function createUser(data) {
    try {
        const [ id ] = await db('user').insert(data);
        //inserting new user and returning their created id and entered email
        return await db('user')
            .where({ id })
            .select('id', 'email').first();
    } catch (e) {
        console.log(e)
    }
}
//helper model to search users by a filter
//returns nonNullable fields for user (id / password / email / user_type)
async function findBy(filter) {
    try {
        return db("user")
            .select("id", "password", "email", "user_type")
            .where(filter)
            .first();
    } catch (e) {
        console.log(e)
    }
}



