const express = require('express');
const routerUser = express.Router();

routerUser.post('/login', (req, res) => {
    res.statusCode = 201;
    res.json({
        id: 1,
        mail: "test@mail.ru"
    })
})

module.exports = routerUser;