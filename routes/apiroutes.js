const router = require('express').Router(); 
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// require data json file
let notes = require('../db/db.json');

// routes
router.get('/api/notes', (req, res) => {
    res.json(notes);
});

// create notes route
router.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

// create notes function
// TO DO: make into new file
function createNewNote(body, notesArr) {
    const newNote = {
        id: uuidv4(), 
        title: body.title,
        text: body.text

    };
    let newArr = notesArr || [];
    newArr.push(newNote)

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(newArr)
    );
    return newNote;
}

// delete notes route
router.delete('/api/notes/:id',(req,res) => {
    deleteNote(req.params.id, notes)
    res.json(true);
});


// TO DO: make into new file
function deleteNote(id, notesArr) {
    for (let i = 0; i < notesArr.length; i++) {
        let note = notesArr[i];

        if (note.id == id) {
            notesArr.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notesArr)
            );

            break;
        }
    }
}



module.exports = router;