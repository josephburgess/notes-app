const NotesModel = require('./src/NotesModel');
const NotesView = require('./src/NotesView');
const model = new NotesModel();
const view = new NotesView(model);
model.addNote('This is a new note!');
model.addNote('This is a new note!');
view.displayNotes();

console.log(model.getNotes());
