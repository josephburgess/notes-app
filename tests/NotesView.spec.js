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

  const mockEmojifyResponse = (inputText, returnedText) => {
    notesClient.emojifyText.mockImplementationOnce((note, callback) => {
      callback({
        status: 'OK',
        text: inputText,
        emojified_text: returnedText,
      });
    });
  };

  it('should display no notes if empty', () => {
    notesView.displayNotes();

    expect(document.querySelectorAll('.note').length).toBe(0);
  });

  it('should display two notes', () => {
    notesModel.addNote('note 1');
    notesModel.addNote('note 2');
    notesView.displayNotes();

    expect(document.querySelectorAll('.note').length).toBe(2);
  });

  it('should not add extra notes when calling displayNotes', () => {
    notesModel.addNote('Note 1');
    notesView.displayNotes();
    expect(document.querySelectorAll('.note').length).toBe(1);

    notesView.displayNotes();
    expect(document.querySelectorAll('.note').length).toBe(1);
  });

  it('should allow the user to input two notes, with the input field clearing each time', () => {
    const textInput = document.querySelector('#notes-input');
    const button = document.querySelector('#add-note-button');

    mockEmojifyResponse('Note 1', 'Note 1');
    mockEmojifyResponse('Note 2', 'Note 2');

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

  it('displays notes fetched from notes server (GET /notes)', () => {
    const displaySpy = jest.spyOn(notesView, 'displayNotes');
    notesClient.loadNotes.mockImplementation((callback) => {
      callback(['This is a mock note']);
    });

    notesView.displayNotesFromApi();

    expect(notesClient.loadNotes).toHaveBeenCalled();
    expect(notesModel.getNotes()).toEqual(['This is a mock note']);
    expect(displaySpy).toHaveBeenCalled();
  });

  it('creates a note when button is clicked and sends a POST request to backend', () => {
    const textInput = document.querySelector('#notes-input');
    const button = document.querySelector('#add-note-button');

    mockEmojifyResponse('Note 1', 'Note 1');

    textInput.value = 'Note 1';
    button.click();

    expect(notesClient.createNote).toHaveBeenCalledWith(
      'Note 1',
      expect.any(Function)
    );
  });

  it('deletes the notes when the button is clicked', () => {
    const button = document.querySelector('#delete-notes-button');
    button.click();

    expect(notesClient.deleteNotes).toHaveBeenCalled();
  });

  it('should display an error when displayError is triggered', () => {
    notesView.displayError('Oops! Looks like something went wrong...');
    const errorElement = document.querySelector('h2.error');
    expect(errorElement.textContent).toBe(
      'Oops! Looks like something went wrong...'
    );
  });

  it('displays emojified text if the text has tags', () => {
    const textInput = document.querySelector('#notes-input');
    const button = document.querySelector('#add-note-button');

    mockEmojifyResponse('Fire: :fire:', 'Fire: 🔥');

    textInput.value = 'Fire: :fire:';
    button.click();

    expect(document.querySelector('.note').textContent).toBe('Fire: 🔥');
    expect(notesClient.emojifyText).toHaveBeenCalledWith(
      'Fire: :fire:',
      expect.any(Function)
    );
  });
});
