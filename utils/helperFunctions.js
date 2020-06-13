const {
    userHelper,
    techHelper,
    connectHelper,
    locationHelper,
    jobHelper
} = require('../models/classHelpers');

async function setJobLocation(user) {

       if (!user.job_title_id) {
            user.job_title_id = 1
        }
            const job = await jobHelper.findById(user.job_title_id);

        if (!user.location_id) {
            user.location_id = 1
        }
            const location = await locationHelper.findById(user.location_id);
            const tech = await techHelper.userTech(user.id)
            const techId = tech.map(arr => {
                return arr.id
            })
               delete user.password
               return {
                   ...user,
                   job_title: job.job_title,
                   location: location.location,
                   techs: techId
               }
}

module.exports = {
    setJobLocation
}