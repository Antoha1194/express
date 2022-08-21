const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const routerBooks = require('./routes/books.js');
const routerUser = require('./routes/user.js');
const routerIndex = require('./routes/index.js');
const errorMidleware = require('./midleware/error');
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', routerIndex);
app.use('/api/books', routerBooks);
app.use('/api/user', routerUser);

app.use(errorMidleware);
app.listen(port, () => {
    console.log(`Сервер запуще на localhost:${port}`);
})