const NotesClient = require('./src/NotesClient');
const NotesModel = require('./src/NotesModel');
const NotesView = require('./src/NotesView');

const client = new NotesClient();
const model = new NotesModel();
const view = new NotesView(model, client);

console.log('The notes app is running');
view.displayNotesFromApi();
