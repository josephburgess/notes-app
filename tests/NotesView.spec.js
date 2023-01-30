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
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(1);
  });
  it('should add a note with user input via form and button click', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const model = new NotesModel();
    const view = new NotesView(model);
    const input = document.querySelector('#notes-input');
    input.value = 'Test note';
    const submitButton = document.querySelector('#add-note-button');
    submitButton.click();
    expect(document.querySelector('div.note')).not.toBeNull();
    expect(document.querySelector('div.note').textContent).toEqual('Test note');
  });
});
