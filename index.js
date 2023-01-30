const NotesClient = require('./src/NotesClient');
const NotesModel = require('./src/NotesModel');
const NotesView = require('./src/NotesView');
const client = new NotesClient();
const model = new NotesModel();
const view = new NotesView(model, client);
view.displayNotesFromApi();
model.addNote('This is a new note!');
model.addNote('This is a new note!');
view.displayNotes();

console.log(model.getNotes());
