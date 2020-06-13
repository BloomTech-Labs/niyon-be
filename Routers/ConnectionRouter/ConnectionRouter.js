const express = require('express');
const restricted = require('../../Middleware/restricted');
const { userHelper, connectHelper } = require('../../models/classHelpers');

const router = express.Router();


router.post('/request/:id', restricted(), async (req, res, next) => {
    try {
        const {mentor_id} = req.body;
        const mentee_id = req.params.id;
        const requestConnection = await connectHelper.updateConnection(mentee_id, mentor_id)
        res.status(201).json('Connection Request Sent')
    } catch (e) {
        console.log(e)
        res.status(400).json({
            errorMessage: "Connection already sent to user"
        })
    }
});

router.post('/response/:id', restricted(), async (req, res, next) => {
    const user_id = req.params.id;
    const { status, rejected, userReq } = req.body;

        if (status === true) {
            const accepted = await connectHelper.responseConnection(user_id, userReq, {
                status: true,
                rejected: false
            })
            const acceptedReq = await connectHelper.responseConnection(userReq, user_id, {
                status: true,
                rejected: false
            })
            return res.status(201).json(accepted)
        }
        if (rejected === true) {
            const rejected = await connectHelper.responseConnection(user_id, userReq,  {
                status: false,
                rejected: true
            })
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