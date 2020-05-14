const express = require('express');
const helmet = require('helmet');
const authRouter = require('./Routers/AuthRouter/AuthRouter');
const profileRouter = require('./Routers/ProfileRouter/ProfilePackage');
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/auth', authRouter);
server.use('/profile', profileRouter);

server.get('/', (req, res) => {
    res.status(200).json({
        welcomeMessage: 'Welcome to the Niyon Backend'
    })
})

server.use('/', (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        errorMessage: `Error message - ${err.message}`
    })
})

if (!module.parent) {
    server.listen(PORT, () => {
        console.log(`--- server running on port ${PORT} ---`);
    })
}

module.exports = server;