/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('../src/NotesModel');
const NotesView = require('../src/NotesView');
const { hasUncaughtExceptionCaptureCallback } = require('process');

describe('NotesView', () => {
  it('should display the notes in the HTML page', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote('Test #1');
    model.addNote('Test #2');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(2);
  });
});
