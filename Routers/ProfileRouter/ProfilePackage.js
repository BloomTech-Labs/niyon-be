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
        const user_id = req.params.id
        const { techs, location_id, job_title, first_name, last_name, bio } = req.body;
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
                    console.log('promise resolved successfully')
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
                    console.log('promise resolved successfully')
                    tech_stack.push(res)
                })
                .catch(err => {
                    console.log(err)
                })
        })
        const updatedUser = await helpers.user.findById(user_id)
        const returnedUser = {
                ...updatedUser,
            job_title: getTitle.job_title,
            location: getLocation.location,
            techs: tech_stack
        }
        // deleting password for security
        delete returnedUser.password
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
        if (!user.job_title_id) {
            user.job_title_id = 1
        }
        const job = await helpers.job_title.getById(user.job_title_id);
        if (!user.location_id) {
            user.location_id = 1
        }
        const location = await helpers.location.getById(user.location_id);
            if (!location.location) {
                location.location = 1
            }
        const techs = await helpers.tech.userTech(user_id);

        const returnedUser = {
            ...user,
            job_title: job.job_title,
            location: location.location,
            tech_stack: techs,
        }

        // deleting password from return object to client for security reasons
        delete returnedUser.password
       return res.status(200).json(returnedUser)
   } catch (e) {
       console.log(e);
       next();
   }
});

router.post('/:id',restricted(), async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const validateUser = await helpers.user.findById(user_id);
            if (!validateUser) {
                res.status(400).json({
                    errorMessage: 'User ID not found'
                })
            }
        const data = req.body;
            if (!data) {
                res.status(400).json({
                    errorMessage: "No data included in request"
                })
            }
        const update = await helpers.user.update(user_id, data)
        res.status(201).json(update)
    } catch (e) {
        console.log(e)
        next()
    }
});

module.exports = router;