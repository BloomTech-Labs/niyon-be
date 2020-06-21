const express = require('express');
const { userHelper, jobHelper, locationHelper, techHelper, connectHelper } = require('../../models/classHelpers');
const restricted = require('../../Middleware/restricted');
const decoder = require('jwt-decode');
const { setJobLocation, filterProfileConnection } = require('../../utils/helperFunctions')


const router = express.Router();

router.get('/profilePackage',restricted(), async (req, res, next) => {
    try {
        const tech = await techHelper.getAll();
        const location = await locationHelper.getAll();
        const jobs = await jobHelper.getAll();

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
       const token = req.headers.authorization;
       const tokenAuth = decoder(token);
       const userConnections = await connectHelper.allMyConnections(tokenAuth.user_id);
       const myConnectionId = [];

       await userConnections.map(arr => {
           if (arr.userReq === tokenAuth.user_id) {
               myConnectionId.push(arr.userAcc)
           } else {
               myConnectionId.push(arr.userReq)
           }
        })

    myConnectionId.push(tokenAuth.user_id)

    const allUsers = await userHelper.getAll();

    async function userData(arr) {
        try {
            const user = await setJobLocation(arr)
            return user
        } catch (e) {
            console.log(e)
        }
    }

    async function setUser(arr) {
        try {
            const user =  await userHelper.findById(arr);
            delete user.password
            return user
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        const allProfiles = await Promise.all(allUsers.map(arr => userData(arr)));

        const allProfileId = allProfiles.map(arr => {
            return arr.id
        })

        const allFilteredProfiles = await allProfileId.filter(user => !myConnectionId.includes(user))
        const allUserObjects = await Promise.all(allFilteredProfiles.map(user => setUser(user)))
        return await Promise.all(allUserObjects.map(arr => userData(arr)))
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
       const userUpdate = await setJobLocation(user)

       const myConns = await connectHelper.myConnections(user.id)

       const myConnections = myConns.filter(arr => {
           return arr.rejected === false && arr.status === true
       })

       const myConnsAcc = myConnections.filter(arr => {
           return arr.userAcc === user.id
       })

       const myConnsReq = myConnections.filter(arr => {
           return arr.userReq === user.id
       })

       const myRequests = await connectHelper.newConnections(user.id)
       const myOutGoingRequests = await connectHelper.newConnectionRequests(user_id)

       async function connData(arr) {
               try {
                   const connProfile = await userHelper.findById(arr);
                   return await setJobLocation(connProfile)
               } catch (e) {
                   console.log(e)
           }
       }

        async function connRequest(arr) {
            let connRequest
           try {
               connRequest = await userHelper.findById(arr)
                return await setJobLocation(connRequest)
           } catch (e) {
               console.log(e)
           }
       }

       const getData = async () => {
           const myConnProfileAcc = await Promise.all(myConnsAcc.map(arr => connData(arr.userReq)));
           const myConnProfileReq = await Promise.all(myConnsReq.map(arr => connData(arr.userAcc)))
           const myConnRequest = await Promise.all(myRequests.map(arr => connRequest(arr.userReq)));
           const mySentRequests = await Promise.all(myOutGoingRequests.map(arr => connRequest(arr.userAcc)));

           const myConnProfiles = [];
               myConnProfileAcc.map(arr => {
                   myConnProfiles.push(arr)
                })
               myConnProfileReq.map(arr => {
                   myConnProfiles.push(arr)
                })
           return {
                myConnProfiles,
                myConnRequest,
                mySentRequests
           }
       }

       delete user.password
       getData().then(data => {
           res.status(200).json({
                ...userUpdate,
                myConnections: data.myConnProfiles,
                myRequests: data.myConnRequest,
                mySentRequests: data.mySentRequests
           })
       })
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
        await setJobLocation(user)
        const tech = await techHelper.userTech(user.id);
        const techID = tech.map(arr => {
            return arr.id
        })

        const returnedUser = {
            ...user,
            techs: techID
        }
        delete returnedUser.password
        res.status(201).json(returnedUser)
    } catch (e) {
        console.log(e)
        next()
    }
});

module.exports = router;
