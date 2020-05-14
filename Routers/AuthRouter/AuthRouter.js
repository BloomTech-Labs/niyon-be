const express = require('express');
const helpers = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // checking entered email to make sure it is not already registered
        const user = await helpers.findBy({email});
            if (user) {
                return res.status(409).json({
                    errorMessage: `${email} is already registered`
                })
            }
        // hashing the entered password for security
        const hashedPW = await bcrypt.hash(password, 10);
        // creating a new user with entered input and a hashed password
        const newUser = await helpers.createUser({...req.body, password: hashedPW});
        // creating a token and sending by newly created user
        const token = jwt.sign({payload: newUser}, process.env.JWT_SECRET);
        // sending back newly created user with auto ID
        // also sending back token to be used in the headers under (authorization) for protected routes
        res.status(201).json({
            token: token,
            user: newUser
        })
    } catch (e) {
        console.log(e);
        next();
    }
});

router.post('/login', async (req, res, next) => {
   try {
        const { email } = req.body;
        const { password } = req.body;
        // checking entered email to make sure user exists
        const authUser = await helpers.findBy({email});
            if(!authUser) {
                res.status(409).json({
                    errorMessage: `${email} is not registered`
                })}
        // validating the entered password against stored password for entered email
        const validPW = await bcrypt.compare(password, authUser.password);
                if(!validPW) {
                    res.status(401).json({
                        errorMessage: 'Invalid Password'
                    })}
        const payload = {
                    user_id: authUser.id,
                    email: authUser.email,
                    user_type: authUser.user_type
                };
        // creating a token with the payload of the logged in user
        const token = jwt.sign(payload, process.env["JWT_SECRET"]);
        // returning the logged in user ( id / email / user_type )
       // also sending back token to be used in the headers under (authorization) for protected routes
        return res.json({
            token: token,
            user: payload
        })
   } catch (e) {
       console.log(e);
       next();
   }
});

module.exports = router;
