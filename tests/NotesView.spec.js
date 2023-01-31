/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('../src/NotesModel');
const NotesView = require('../src/NotesView');
const NotesClient = require('../src/NotesClient');

jest.mock('../src/NotesClient.js');

describe(NotesView, () => {
  let notesModel, notesView, notesClient;
  beforeEach(() => {
    NotesClient.mockClear();

    document.body.innerHTML = fs.readFileSync('./index.html');

    notesClient = new NotesClient();
    notesModel = new NotesModel();
    notesView = new NotesView(notesModel, notesClient);
  });

  it('display notes is empty', () => {
    notesView.displayNotes();

    expect(document.querySelectorAll('.note').length).toBe(0);
  });

  it('displays two notes', () => {
    notesModel.addNote('note 1');
    notesModel.addNote('note 2');
    notesView.displayNotes();

    expect(document.querySelectorAll('.note').length).toBe(2);
  });

  it('displayNotes does not add extra notes', () => {
    notesModel.addNote('Note 1');
    notesView.displayNotes();
    expect(document.querySelectorAll('.note').length).toBe(1);

    notesView.displayNotes();
    expect(document.querySelectorAll('.note').length).toBe(1);
  });

  it('user inputs two notes with a button', () => {
    const textInput = document.querySelector('#notes-input');
    const button = document.querySelector('#add-note-button');

    textInput.value = 'Note 1';
    button.click();
    expect(textInput.value).toBe('');

    textInput.value = 'Note 2';
    button.click();
    expect(textInput.value).toBe('');

    const notes = document.querySelectorAll('.note');
    expect(notes.length).toBe(2);
    expect(notes[0].textContent).toBe('Note 1');
    expect(notes[1].textContent).toBe('Note 2');
  });

  it('displays notes from notes server (GET /notes)', () => {
    const displaySpy = jest.spyOn(notesView, 'displayNotes');
    notesClient.loadNotes.mockImplementation((callback) => {
      callback(['This is a mock note']);
    });

    notesView.displayNotesFromApi();

    expect(notesClient.loadNotes).toHaveBeenCalled();
    expect(notesModel.getNotes()).toEqual(['This is a mock note']);
    expect(displaySpy).toHaveBeenCalled();
  });

  it('creates a note when button is clicked', () => {
    const textInput = document.querySelector('#notes-input');
    const button = document.querySelector('#add-note-button');

    textInput.value = 'Note 1';
    button.click();

    expect(notesClient.createNote).toHaveBeenCalledWith('Note 1');
  });
});
