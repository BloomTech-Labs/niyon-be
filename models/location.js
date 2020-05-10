const db = require('../db/config');

module.exports = {
    getLocations
}
//helper model to return all location data (id / city / country)
function getLocations() {
    return  db('location')
}