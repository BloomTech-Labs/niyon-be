const express = require('express');
const helpers = require('../../models/index');
const restricted = require('../../Middleware/restricted');

const router = express.Router();

router.get('/profilePackage',restricted(), async (req, res, next) => {
    try {
        const tech = await helpers.tech.getTech();
        const location = await helpers.location.getLocations();
        const jobs = await helpers.job_title.getTitles();

        const profile_starter = {
            tech,
            location,
            jobs
        }
        return res.status(200).json(profile_starter);
    } catch (e) {
        console.log(e);
        next();
    }
});

module.exports = router;