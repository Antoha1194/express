const express = require('express');
const app = express();
const port = 3000;
const formData = require('express-form-data')
const Book = require('./Book.js');
const store = require('./store.js');


app.use(formData.parse());

app.get('/api/books', (req, res) => {
    const {books} = store;
    res.json(store);
})

app.get('/api/books/:id', (req, res) => {
    const {books} = store;
    const book = books.filter(item => item.id === req.params.id);
    if(book.length == 0){
        res.statusCode = 404;
        res.json('Нет данных');
    }else{
        res.json(book);
    }
    
})

app.post('/api/user/login', (req, res) => {
    res.statusCode = 201;
    res.json({
        id: 1,
        mail: "test@mail.ru"
    })
})

app.post('/api/books', (req, res) => {
    const {books} = store;
    const book = new Book(req.body);
    books.push(book);
    res.send(book);    
})

app.put('/api/books/:id', (req, res) => {
    const {books} = store;
    let index = books.findIndex(item => item.id === req.params.id);
    if(index == -1){
        res.statusCode = 404;
        res.json('Нет данных');
    }else{
        books[index] = {...req.body};

        res.json(books[index]);
    }
    
})


app.delete('/api/books/:id', (req, res) => {
    const {books} = store;
    
    if(books.findIndex(item => item.id == req.params.id) == -1){
        res.statusCode = 404;
        res.json('Нет данных');
    }else{
        store.books = books.filter(item => item.id !== req.params.id);
        res.json("OK");;
    }
})

app.listen(port, () => {
    console.log(`Сервер запуще на localhost:${port}`);
})