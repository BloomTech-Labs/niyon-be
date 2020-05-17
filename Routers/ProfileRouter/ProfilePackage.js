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

router.put('/profilePackage/:id', restricted(), async (req, res, next) => {
    try {
        const { user_id, techs, location_id, job_title, first_name, last_name, bio } = req.body;
        const findUser = await helpers.user.findById(user_id);
            if (findUser.first_name === null) {
                await helpers.user.update(user_id, {first_name})
            }
            if (findUser.last_name === null) {
                await helpers.user.update(user_id, {last_name})
            }
            if (findUser.job_title_id === null) {
                await helpers.user.update(user_id, {job_title_id: job_title})
            }
            if (findUser.location_id === null) {
                await helpers.user.update(user_id, {location_id})
            }
            if (findUser.bio === null) {
                await helpers.user.update(user_id, {bio})
            }

        techs.forEach((arr) => {
            const tech = helpers.tech.updateTech(user_id, arr)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        })

        const getTitle = await helpers.job_title.getById(job_title);
        const getLocation = await helpers.location.getById(location_id)
        const tech_stack = [];
        techs.forEach((arr) => {
            const tech = helpers.tech.getById(arr)
                .then(res => {
                    console.log(res)
                    tech_stack.push(res)
                })
                .catch(err => {
                    console.log(err)
                })
        })
        const updatedUser = await helpers.user.findById(user_id)
        const returnedUser = {
                ...updatedUser,
            job_title: getTitle,
            location: getLocation,
            techs: tech_stack
        }
        console.log(returnedUser)
        res.status(201).json(returnedUser)
    } catch (e) {
        console.log(e)
        next()
    }
});

router.get('/:id', restricted(), async (req, res, next) => {
   try {
        const user_id = req.params.id;
        const user = await helpers.user.findById(user_id);
        const job = await helpers.job_title.getById(user.job_title_id);
        const location = await helpers.location.getById(user.location_id);
        const techs = await helpers.tech.userTech(user_id);

        const returnedUser = {
            ...user,
            job_title: job.Title,
            location: location,
            tech_stack: techs,
        }
        // deleting password from return object to client for security
        delete returnedUser.password
       return res.status(200).json(returnedUser)
   } catch (e) {
       console.log(e);
       next();
   }
});

module.exports = router;