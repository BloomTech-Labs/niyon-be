const user = require('./user');
const tech = require('./tech');
const location = require('./location');
const job_title = require('./job_title')

//creating one object of all broken out helper models
module.exports = {
    user,
    tech,
    location,
    job_title
};

