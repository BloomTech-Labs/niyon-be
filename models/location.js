const db = require('../db/config');

module.exports = {
    getLocations,
    getById
}
//helper model to return all location data (id / city / country)
function getLocations() {
    return  db('location')
}

async function getById(id) {
    return db('location')
        .select("location")
        .where({id: id})
        .first();
}