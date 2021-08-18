const express = require('express'); 

// TO DO: make into new file
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
}