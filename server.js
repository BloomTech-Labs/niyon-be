const express = require('express');
const helmet = require('helmet');
const authRouter = require('./Routers/AuthRouter/AuthRouter');

const PORT = process.env.PORT || 4000;

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/auth', authRouter);

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

server.listen(PORT, () => {
    console.log(`--- server running on port ${PORT} ---`);
})