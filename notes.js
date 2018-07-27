const fs = require('fs');

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();;
    let note = {
        title,
        body
    };
    
    let duplicateNotes = notes.filter((note)=>note.title === title);

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        console.log(note);
        return note;
    }
};

let getAll = () => {
    return fetchNotes();
    
};

let getNote = (title) => {
    let notes = fetchNotes();
    let noteToRead = notes.filter((note)=>note.title === title);
    return noteToRead[0];
};

let removeNote = (title) => {
    let notes = fetchNotes();
    if(notes.length > 0){
        let newNotes = notes.filter((note)=>note.title !== title);
        saveNotes(newNotes);
        return true;
    } else {
        //console.log('No notes to remove');
        return false;
    }

};

let logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title} \nBody: ${note.body}.`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};