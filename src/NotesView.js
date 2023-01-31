class NotesView {
  constructor(notesModel, notesClient) {
    this.notesModel = notesModel;
    this.notesClient = notesClient;
    this.mainContainer = document.querySelector('#main-container');
    this.submitButton = document.querySelector('#add-note-button');
    this.noteForm = document.querySelector('#notes-input');
    this.submitButton.addEventListener('click', this.handleSubmit.bind(this));
    this.noteForm.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleSubmit() {
    let formInput = this.noteForm.value;
    this.notesModel.addNote(formInput);
    this.notesClient.createNote(formInput, () => {
      this.displayError('Failed to send to the server!');
    });
    this.displayNotes();
    this.noteForm.value = '';
  }

  handleKeydown(event) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  displayNotes() {
    this.#removeNotes();

    this.notesModel.getNotes().forEach((note) => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.textContent = note;
      this.mainContainer.append(noteElement);
    });
  }

  displayNotesFromApi() {
    this.notesClient.loadNotes(
      (notes) => {
        this.notesModel.setNotes(notes);
        this.displayNotes();
      },
      () => {
        this.displayError('Oops - backend appears to be down!');
      }
    );
  }

  displayError(error) {
    const errorMessage = document.createElement('h2');
    errorMessage.className = 'error';
    errorMessage.textContent = error;
    this.mainContainer.append(errorMessage);
  }

  #removeNotes() {
    this.mainContainer
      .querySelectorAll('.note')
      .forEach((note) => note.remove());
  }
}
module.exports = NotesView;
