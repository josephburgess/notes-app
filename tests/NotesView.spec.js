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
  let model, view, client;

  beforeEach(() => {
    NotesClient.mockClear();

    document.body.innerHTML = fs.readFileSync('./index.html');

    client = new NotesClient();
    model = new NotesModel();
    view = new NotesView(model, client);
  });

  it('should display the notes in the HTML page', () => {
    model.addNote('Test #1');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(1);
  });
  it('should add a note with user input via form and button click', () => {
    const input = document.querySelector('#notes-input');
    input.value = 'Test note';
    const submitButton = document.querySelector('#add-note-button');
    submitButton.click();
    expect(document.querySelector('div.note')).not.toBeNull();
    expect(document.querySelector('div.note').textContent).toEqual('Test note');
  });

  it('displays notes from notes server (GET /notes)', () => {
    const displaySpy = jest.spyOn(view, 'displayNotes');
    model = {
      setNotes: jest.fn(),
      getNotes: jest.fn(() => ['This is a mock note']),
    };

    view.displayNotesFromApi();

    expect(model.getNotes()).toEqual(['This is a mock note']);
    expect(displaySpy).toHaveBeenCalled();
  });
});
