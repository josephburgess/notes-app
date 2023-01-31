const NotesClient = require('../src/NotesClient');
require('jest-fetch-mock').enableMocks();

describe('Client class', () => {
  it('calls fetch and loads data', (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify(['a test note']));

    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi[0]).toBe('a test note');
      done();
    });
  });

  it('createNote adds a note to the database', () => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify('Mock note'));

    client.createNote('Mock note');

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
});
