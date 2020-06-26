const express = require('express');
const restricted = require('../../Middleware/restricted');
const { userHelper, connectHelper } = require('../../models/classHelpers');

const router = express.Router();


router.post('/request/:id', restricted(), async (req, res, next) => {
    try {
        // pulling the mentor ID from the req body, and the mentee ID from the params
        const { mentor_id } = req.body;
        const mentee_id = req.params.id;
        // sending the two ID's to the database to create the initial connection request
        const requestConnection = await connectHelper.updateConnection(mentee_id, mentor_id)
        res.status(201).json('Connection Request Sent')
    } catch (e) {
        console.log(e)
        res.status(400).json({
            // if the connection already exists sends and error message
            // NOTE - a connection request with the same ID's switched will be valid and create duplicates
            errorMessage: "Connection already sent to user"
        })
    }
});

router.post('/response/:id', restricted(), async (req, res, next) => {
    // grabbing the user ID from the params and the data from the req body
    const user_id = req.params.id;
    const { status, rejected, userReq } = req.body;
        // runs if the connection was accepted
        if (status === true) {
            // we return the logged in user side of the connection
            const accepted = await connectHelper.responseConnection(user_id, userReq, {
                status: true,
                rejected: false
            })
            // in the background we update the user requesting the connection
            const acceptedReq = await connectHelper.responseConnection(userReq, user_id, {
                status: true,
                rejected: false
            })
            return res.status(201).json(accepted)
        }
        // runs if the connection was rejected
        if (rejected === true) {
            // we return the logged in user side of the connection
            const rejected = await connectHelper.responseConnection(user_id, userReq,  {
                status: false,
                rejected: true
            })
            // in the background we update the user requesting the connection
            const rejectedReq = await connectHelper.responseConnection(userReq, user_id,  {
                status: false,
                rejected: true
            })
            return res.status(200).json(rejected)
        }
    const connections = await connectHelper.requestConnection(user_id);
    res.status(200).json(connections)

});

module.exports = router;