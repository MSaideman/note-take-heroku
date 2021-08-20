// require modules
const fs = require('fs');
const path = require('path');
const express = require('express');

// call express module
const app = express();

// heroku port set-up
const PORT = process.env.PORT || 3001;

// require data json file
const notes = require('./db/db.json');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(require('./routes/apiroutes'));
app.use(require('./routes/htmlroutes'));

// listen to port function
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
