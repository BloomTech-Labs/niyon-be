const express = require('express');
const helpers = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await helpers.findBy(email).first();
            if (user) {
                return res.status(409).json({
                    errorMessage: `${email} is already registered`
                })
            }
        const newUser = await helpers.createUser(req.body);
        res.status(201).json(newUser)
    } catch (e) {
        console.log(e);
        next();
    }
});

module.exports = router;
