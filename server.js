"use strict"
const express = require('express');
const app = express();
const path = require('path');
const port = 3003;

// MIDDLEWARE TO DEFINE FOLDER FOR STATIC FILES
app.use(express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, function() {
  console.log('App is listening on port: ' + port);
});
