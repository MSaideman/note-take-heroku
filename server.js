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

// create notes function
function createNewNote(body, notesArr) {
    const newNote = body;
    if (!Array.isArray(notesArr))
        notesArr = [];
    
    if (notesArr.length === 0)
        notesArr.push(0);

    body.id = notesArr[0];
    notesArr[0]++;

    notesArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

function deleteNote(id, notesArr) {
    for (let i = 0; i < notesArr.length; i++) {
        let note = notesArr[i];

        if (note.id == id) {
            notesArr.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArr, null, 2)
            );

            break;
        }
    }

// delete notes function
app.delete('/api/notes/:id',(req,res) => {
    deleteNote(req.params.id, notes)
    res.json(true);
});

// listen to port function
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


