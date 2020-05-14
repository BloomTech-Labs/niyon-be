const db = require('../db/config');

module.exports = {
    createUser,
    findBy,
    findById,
    update
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

async function findById(id) {
    try {
        return db('user')
            .select("*")
            .where({id: id})
            .first()
    } catch (e) {
        console.log(e);
    }
}

async function update(id,data) {
    try {
        return await db('user').update(data).where({id: id})
    } catch (e) {
        console.log(e)
    }
}

async function addJob(user_id, job_id) {
    try {

    } catch (e) {
        console.log(e)
    }
}



