// require modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createNewNote } = require('./assets/js/createNotes');
const { deleteNote } = require('./assets/js/deleteNotes');

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

// routes
app.get('/api/notes', (req, res) => {
    res.json(notes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// create notes route
app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

// delete notes route
app.delete('/api/notes/:id',(req,res) => {
    deleteNote(req.params.id, notes)
    res.json(true);
});

// listen to port function
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
