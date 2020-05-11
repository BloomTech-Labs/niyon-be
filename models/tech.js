const db = require('../db/config');

module.exports = {
    getTech
}
//helper model to return all tech data (id / name / type)
 function getTech() {
        return  db('tech')
}