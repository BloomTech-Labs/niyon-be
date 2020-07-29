const {
    userHelper,
    techHelper,
    connectHelper,
    locationHelper,
    jobHelper
} = require('../models/classHelpers');
const axios = require('axios')

/*
    This function takes the users id's for job, location, tech and returns
    three keys to the user object with their values
 */
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

// axios call to Dev.to for our news feed data
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
// removing unused keys from the return object
async function formatDevArticles(arr) {
    delete arr.readable_reactions_count;
                delete arr.slug;
                delete arr.path;
                delete arr.comments_count;
                delete arr.public_reactions_count;
                delete arr.collection_id;
                delete arr.published_timestamp;
                delete arr.positive_reactions_count;
                delete arr.canonical_url;
                delete arr.edited_at;
                delete arr.crossposted_at;
                delete arr.last_comment_at;
                delete arr.tags;
                return arr
}

module.exports = {
    setJobLocation,
    filterProfileConnection,
    axiosCall,
    formatDevArticles
}