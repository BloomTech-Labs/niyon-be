const express = require('express');
const { userHelper, jobHelper, locationHelper, techHelper } = require('../../models/classHelpers');
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

router.get('/', restricted(), async (req, res, next) => {
   try {
    const allUsers = await userHelper.getAll();
    async function userData(arr) {
        try {
            if (!arr.job_title_id) {
                arr.job_title_id = 1
            }
            if (!arr.location_id) {
                arr.location_id = 1
            }
            const job = await jobHelper.findById(arr.job_title_id);
            const location = await locationHelper.findById(arr.location_id);
            const techs = await techHelper.userTech(arr.id);
            delete arr.password;

            return {
                ...arr,
                job: job.job_title,
                location: location.location,
                tech_stack: techs
            }
        } catch (e) {
            console.log(e)
        }
    }
    const getData = async () => {
        return Promise.all(allUsers.map(arr => userData(arr)))
    }
    getData().then(data => {
        res.status(200).json(data)
    })
   } catch (e) {
       next(e);
   }
});

router.get('/:id', restricted(), async (req, res, next) => {
   try {
        const user_id = req.params.id;
        const user = await userHelper.findById(user_id);
            if (!user) {
                res.status(404).json({
                    errorMessage: `User with the id of ${user_id} was not found`
                })
            }
        if (!user.job_title_id) {
            user.job_title_id = 1
        }
        const job = await jobHelper.findById(user.job_title_id);

        if (!user.location_id) {
            user.location_id = 1
        }
        const location = await locationHelper.findById(user.location_id);
        const techs = await techHelper.userTech(user.id);

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
        const validateUser = await userHelper.findById(user_id);
            if (!validateUser) {
                res.status(400).json({
                    errorMessage: 'User ID not found'
                })
            }
        const { techs } = req.body;
            if ( techs ) {
                techs.map((arr) => {
                    techHelper.updateTech(user_id, arr)})
            }
        const { first_name, last_name, bio, email, job_title_id, location_id }  = req.body;
        const data = {
            first_name,
            last_name,
            bio,
            email,
            job_title_id,
            location_id
        }
            if (!data) {
                res.status(400).json({
                    errorMessage: "No data included in request"
                })
            }
        await userHelper.update(user_id, data);
        const user = await userHelper.findById(user_id);
        const job = await jobHelper.findById(user.job_title_id);
        const location = await locationHelper.findById(user.location_id);
        const tech = await techHelper.userTech(user.id);

        const returnedUser = {
            ...user,
            job,
            location,
            tech
        }
        delete returnedUser.password
        res.status(201).json(returnedUser)
    } catch (e) {
        console.log(e)
        next()
    }
});

module.exports = router;