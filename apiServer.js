const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//Mongo connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookstore');

const db = mongoose.connection;
db.on('error', console.error.bind(console,'mongodb connection error'));

//Sessions
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}));

app.post('/cart', function(req,res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      console.log(err);
    }
    res.json(req.session.cart);
  })
});

app.get('/cart', function(req,res){
  if(typeof req.session.cart!=='undefined'){
    res.json(req.session.cart);
  }
});


//API
const Book = require('./models/book.js');

//POST Books
app.post('/books',function(req, res){
  var book = req.body;

  Book.create(book, function(err,books){
    if(err){
      console.log(err);
    }
    res.json(books);
  })
})

//GET Books
app.get('/books', function(req, res){
  Book.find(function(err, books){
    if(err){
      console.log(err);
    }
    res.json(books);
  })
})

//DELETE Books

app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};

  Book.remove(query, function(err,books){
    if(err){
      console.log(err);
    }
    res.json(books);
  })
})
//UPDATE Books
app.put('/books/:id', function(req,res){
  var book = req.body;
  var query = req.params._id;

  var updatedBook = {
    '$set':{
      title: book.title,
      description:book.description,
      image: book.image,
      price: book.price
    }
  };
  //option to return updated document
  var options = {new: true};

  Book.findOneAndUpdate(query, updatedBook,options,function(err,book){
    if(err){
      console.log(err);
    }
    res.json(book);
  })
})

app.get('/images', function(req, res){
  const imgFolder = __dirname + '/public/images';
  const fs = require('fs');

  fs.readdir(imgFolder, function(err,files){
    if(err){
      return console.error(err);
    }

    const filesArr = [];

    files.forEach(function(file){
      filesArr.push({name: file});
    });

    res.json(filesArr);
  })
})

//END API
app.listen(5000, err =>{
  if(err){
    return console.log(err);
  }
  console.log('API listening on port 5000');
})

module.exports = app;
