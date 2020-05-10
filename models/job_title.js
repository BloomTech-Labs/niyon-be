const db = require('../db/config');

module.exports = {
    getTitles
}
//returns all job titles (id / job_title)
function getTitles() {
    return  db('job_title')
}