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
});
