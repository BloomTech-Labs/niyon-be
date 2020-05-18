const db = require('../db/config');

module.exports = {
    getTitles,
    getById
}
//returns all job titles (id / job_title)
function getTitles() {
    return  db('job_title')
}

async function getById(id) {
    return db('job_title')
        .select("job_title")
        .where({id: id})
        .first();
}