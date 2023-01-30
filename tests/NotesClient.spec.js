const NotesClient = require('../src/NotesClient');
require('jest-fetch-mock').enableMocks();

describe('Client class', () => {
  it('calls fetch and loads data', (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify(['a test note']));

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi[0]).toBe('a test note');

      // 4. Tell Jest our test can now end.
      done();
    });
  });
});
