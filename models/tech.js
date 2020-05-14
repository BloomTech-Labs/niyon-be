const db = require('../db/config');

module.exports = {
    getTech,
    getById,
    updateTech
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