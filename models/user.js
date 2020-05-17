const db = require('../db/config');
const bcrypt = require('bcrypt');

module.exports = {
    createUser,
    findBy,
    findById,
    update,
    userProfile
}
//helper model to use with registration to insert new user in db
async function createUser(user) {
        // hashing the entered password for security
        user.password = await bcrypt.hash(user.password, 10);
        await db("user").insert(user);
        return findBy({email: user.email});
        //inserting new user and returning their created id and entered email
    }

//helper model to search users by a filter
//returns nonNullable fields for user (id / email / user_type)
async function findBy(filter) {
    try {
        return db("user")
            .select('*')
            .where(filter)
            .first();
    } catch (e) {
        console.log(e)
    }
}

function findById(id) {
        return db('user')
            .select('*')
            .where('id', id)
            .first()
}

async function update(id,data) {
    try {
        return await db('user').update(data).where({id: id})
    } catch (e) {
        console.log(e)
    }
}

async function userProfile(id) {
    try {

    } catch (e) {
        console.log(e)
    }
}



