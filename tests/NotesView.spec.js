/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('../src/NotesModel');
const NotesView = require('../src/NotesView');
const NotesClient = require('../src/NotesClient');

jest.mock('../src/NotesClient.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      loadNotes: (callback) => {
        callback(['Note 1', 'Note 2']);
      },
    };
  });
});

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

  it('should load the notes from an API using the loadFromApi function', () => {
    const notesModel = {
      setNotes: jest.fn(),
      getNotes: jest.fn(() => ['Note 1', 'Note 2']),
    };
    const notesClient = new NotesClient();
    const view = new NotesView(notesModel, notesClient);
    const spy = jest.spyOn(view, 'displayNotes');
    view.displayNotesFromApi();
    expect(notesModel.setNotes).toHaveBeenCalledWith(['Note 1', 'Note 2']);
    expect(spy).toHaveBeenCalled();
  });
});
