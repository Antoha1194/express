const express = require('express');
const routerBooks = express.Router();
const Book = require('../Book.js');
const store = require('../store.js');
const upload = require('../midleware/files.js');

routerBooks.get('/', (req, res) => {
    const {books} = store;
    res.json(store);
})

routerBooks.get('/:id/download', (req, res) => {
    const {books} = store;
    const book = books.find(item => item.id == req.params.id);
    console.log(`${__dirname}../${book.fileBook}`);
    res.download(`${__dirname}/../${book.fileBook}`, book.fileName, err => {
        if(err){
            res.status(404).json();
        }
    })
})

routerBooks.get('/:id', (req, res) => {
    const {books} = store;
    const book = books.filter(item => item.id === req.params.id);
    if(book.length == 0){
        res.statusCode = 404;
        res.json(res.statusCode);
    }else{
        res.json(book);
    }
    
})

routerBooks.post('/', upload.fields([{name: 'fileBook', maxCount: 1}, {name: 'fileCover', maxCount: 1}]), (req, res) => {
    const {books} = store;
    const fileBook = req.files['fileBook'][0].path;
    const fileName = req.files['fileBook'][0].originalname;
    const fileCover = req.files['fileCover'][0].path;
    const book = new Book({...req.body, fileBook, fileCover, fileName});
    books.push(book);
    res.send(book);    
});

routerBooks.post('/upload', upload.fields([{name: 'fileBook', maxCount: 1}, {name: 'fileCover', maxCount: 1}]), (req, res, next) => {
    if(req.files){
        const {path} = req.files;
        console.log(req.files);
        res.json(path);
        
    }else{
        res.json(null);
    }
});

routerBooks.put('/:id', upload.fields([{name: 'fileBook', maxCount: 1}, {name: 'fileCover', maxCount: 1}]), (req, res) => {
    const {books} = store;
    let index = books.findIndex(item => item.id === req.params.id);
    if(index == -1){
        res.statusCode = 404;
        res.json(res.statusCode);
    }else{
        const fileBook = req.files['fileBook'][0].path;
        const fileName = req.files['fileBook'][0].originalname;
        const fileCover = req.files['fileCover'][0].path;
        const book = new Book({...req.body, fileBook, fileCover, fileName});
        books[index] = book;

        res.json(books[index]);
    }
    
})


routerBooks.delete('/:id', (req, res) => {
    const {books} = store;
    
    if(books.findIndex(item => item.id == req.params.id) == -1){
        res.statusCode = 404;
        res.json(res.statusCode);
    }else{
        store.books = books.filter(item => item.id !== req.params.id);
        res.json("OK");;
    }
})

module.exports = routerBooks;