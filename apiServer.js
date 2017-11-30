const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');

const Books = require('./models/books.js');

const proxyPort = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
// mongoose.connect('mongodb://localhost:27017/bookShop');
mongoose.connect('mongodb://NinoMaj:blabla37@ds123946.mlab.com:23946/bookshop');

const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
// Set up sesssions
app.use(session({
  secret: 'mySecrectStringWord',
  saveUninitialized: false,
  resave: false,
  // cookie expiration 2 days
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
  // ttl = time to leave, expiration of session, here is set to 2 days
  // after 2 days cookie will automatically be deleted from db
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}))
app.post('/cart', function(req, res) {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if (err) {
      console.error('Error while posting a cart', err);
    }
    res.json(req.session.cart);
  });
});

app.get('/cart', function(req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});
// End of Set up sessions

app.post('/books', function(req, res) {
  const book = req.body;

  Books.create(book, function(err, books) {
    if (err) {
      console.error('Error while posting books', err);
    }
    res.json(books);
  });
});

app.get('/books', function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      console.error('Error while getting books', err);
    }
    res.json(books);
  });
});

app.delete('/books/:_id', function (req, res) {
  const query = { _id: req.params._id };

  Books.remove(query, function (err, confirmation) {
    if (err) {
      console.error('Error while deleting book', err);
    }
    res.json(confirmation);
  });
});

app.put('/books/:_id', function (req, res) {
  const book = req.body;
  const query = { _id: req.params._id };
  // If the field doesn't exist $set will set a new field
  const update  = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  // When true returns the updated document
  const options = { new: true };

  Books.findOneAndUpdate(query, update, options, function(err, book) {
    if (err) {
      console.error('Error while updating book', err);
    }
    res.json(book);
  });
});

// Images API
app.get('/images', (req, res) => {
  const imgFolder = __dirname + '/public/images/';
  // Read all files in the directory
  fs.readdir(imgFolder, (err, files) => {
    if (err) {
      return console.err('Error while getting images', err);
    }
    // Create an emtpy array
    const filesArr = [];
    // Iterate all images in the directory and add to the array
    files.forEach((file) => {
      filesArr.push({ name: file });
    });
    // Send JSON response with the array
    res.json(filesArr);
  });
});

// APIs end

app.listen(proxyPort, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API server is listening on http://localhost:' + proxyPort);
});

module.exports = proxyPort;
