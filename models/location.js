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
        .select("city", "country")
        .where({id: id})
        .first();
}