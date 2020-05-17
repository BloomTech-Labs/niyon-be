const db = require('../db/config');

module.exports = {
    getTech,
    getById,
    updateTech,
    userTech
}
//helper model to return all tech data (id / name / type)
 function getTech() {
        return  db('tech')
}

async function getById(id) {
    return db('tech')
        .select("name", "type")
        .where({id: id})
        .first();
}

async function updateTech(userID, techID) {
    return db('user_tech').insert({user_id: userID, tech_id: techID})
}

async function userTech(id) {
    return db('user_tech as ut')
        .join("user as u", "u.id", "ut.user_id")
        .join("tech as t", "t.id", "ut.tech_id")
        .where("u.id", id)
        .select("t.name", "t.type")
}