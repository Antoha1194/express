const express = require('express');
const routerIndex = express.Router();


routerIndex.get('/', (req, res) => {
    res.send('<h1>Index page</h1>');
})

module.exports = routerIndex;