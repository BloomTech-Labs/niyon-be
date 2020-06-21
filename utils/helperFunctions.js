const {
    userHelper,
    techHelper,
    connectHelper,
    locationHelper,
    jobHelper
} = require('../models/classHelpers');
const axios = require('axios')

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

async function filterProfileConnection(id, user) {
    const myUser = user
    const userConnections = await connectHelper.myConnections(id);
    const myConnectionId = [];

       await userConnections.map(arr => {
           if (arr.userReq === id) {
               myConnectionId.push(arr.userAcc)
           } else {
               myConnectionId.push(arr.userReq)
           }
        })
    async function connData(arr) {
           if (arr === user.id) {
               return {
                   ...user,
                   myConnection: true
               }
           }
    }

    const getData = async () => {
           return await Promise.all(myConnectionId.map(arr => connData(arr)))
    }
    getData().then(data => {
        return data
    })
}

async function axiosCall(url, array) {
        try {
            await axios.get(url)
                .then(res => {
                    res.data.map(arr => {
                        array.push(arr)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            console.log(e)
            return e
        }
}

module.exports = {
    setJobLocation,
    filterProfileConnection,
    axiosCall
}