class NotesClient {
  loadNotes(callback, errorCallback) {
    fetch('http://localhost:3000/notes')
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => {
        errorCallback(error);
      });
  }

  createNote(note, errorCallback) {
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: note }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }

  emojifyText(text, callback) {
    fetch('https://makers-emojify.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((data) => callback(data));
  }

  deleteNotes(errorCallback) {
    fetch('http://localhost:3000/notes', { method: 'DELETE' }).catch(
      (error) => {
        errorCallback(error);
      }
    );
  }
}
module.exports = NotesClient;
