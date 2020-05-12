const express = require('express');
const helmet = require('helmet');

const PORT = process.env.PORT || 4000;

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({
        welcomeMessage: 'Welcome to the Niyon Backend'
    })
})

server.listen(PORT, () => {
    console.log(`--- server running on port ${PORT} ---`);
})