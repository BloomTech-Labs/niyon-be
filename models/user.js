const db = require('../db/config');

module.exports = {
    createUser,
    findBy
}

async function createUser(data) {
    try {
        const [ id ] = await db('user').insert(data);
        return await db('user')
            .where({ id })
            .select('id', 'email').first();
    } catch (e) {
        console.log(e)
    }
}

async function findBy(filter) {
    try {
        return db("user")
            .select("id", "password", "email", "user_type")
            .where(filter)
            .first()
    } catch (e) {
        console.log(e)
    }
}



