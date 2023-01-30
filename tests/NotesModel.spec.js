const NotesModel = require('../src/NotesModel');

describe('NotesModel', () => {
  let model;
  beforeEach(() => {
    model = new NotesModel();
  });

  describe('getNotes', () => {
    it('should return an array when calling getNotes', () => {
      expect(model.getNotes()).toEqual([]);
    });
  });

  describe('addNote', () => {
    it('should add notes to the list of notes', () => {
      model.addNote('Buy milk');
      model.addNote('Go to the gym');
      expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
    });
  });

  describe('reset', () => {
    it('resets the list to an empty array', () => {
      model.addNote('Buy milk');
      model.addNote('Go to the gym');
      expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
      model.reset();
      expect(model.getNotes()).toEqual([]);
    });
  });
});
