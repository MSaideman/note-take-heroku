// const express = require('express'); 

// create notes function
// TO DO: make into new file
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

module.exports = createNewNote;