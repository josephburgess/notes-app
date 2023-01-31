const NotesClient = require('../src/NotesClient');
require('jest-fetch-mock').enableMocks();

describe(NotesClient, () => {
  let notesClient;
  beforeEach(() => {
    fetch.mockReset();
    notesClient = new NotesClient();
  });

  it('calls fetch and loads data', (done) => {
    fetch.mockResponseOnce(JSON.stringify(['a test note']));

    notesClient.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi[0]).toBe('a test note');
      done();
    });
  });

  it('should adds a note to the database when calling createNote', () => {
    fetch.mockResponseOnce(JSON.stringify('Mock note'));

    notesClient.createNote('Mock note');

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/notes',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: 'Mock note' }),
      })
    );
  });

  it('should catch error if loading fails', (done) => {
    fetch.mockRejectedValue('Oops, something went wrong!');

    notesClient.loadNotes(
      () => {},
      (error) => {
        expect(error).toBe('Oops, something went wrong!');

        done();
      }
    );
  });

  it('should send DELETE request to /notes when calling deleteNotes', () => {
    fetch.mockResponseOnce('');

    notesClient.deleteNotes();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/notes', {
      method: 'DELETE',
    });
  });

  it('deleteNotes catches errors', (done) => {
    fetch.mockRejectedValue('Oops, something went wrong');

    notesClient.deleteNotes((error) => {
      expect(error).toBe('Oops, something went wrong');
      done();
    });
  });

  it('should send a fetch request to emojify text', (done) => {
    fetch.mockResponseOnce(
      JSON.stringify({
        status: 'OK',
        text: 'Fire: :fire:',
        emojified_text: 'Fire: 🔥',
      })
    );

    notesClient.emojifyText('Fire: :fire:', (data) => {
      expect(data.emojified_text).toEqual('Fire: 🔥');
      expect(fetch).toHaveBeenCalledWith(
        'https://makers-emojify.herokuapp.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: 'Fire: :fire:' }),
        }
      );
      done();
    });
  });
});
