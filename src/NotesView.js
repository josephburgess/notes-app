class NotesView {
  constructor(notesModel, notesClient) {
    this.notesModel = notesModel;
    this.notesClient = notesClient;
    this.mainContainer = document.querySelector('#main-container');
    this.submitButton = document.querySelector('#add-note-button');
    this.noteContent = document.querySelector('#notes-input');
    this.submitButton.addEventListener('click', this.handleSubmit.bind(this));
    this.noteContent.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleSubmit() {
    this.notesModel.addNote(this.noteContent.value);
    this.displayNotes();
    this.noteContent.value = '';
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
    this.notesClient.loadNotes((notes) => {
      this.notesModel.setNotes(notes);
      this.displayNotes();
    });
  }

  #removeNotes() {
    this.mainContainer
      .querySelectorAll('.note')
      .forEach((note) => note.remove());
  }
}
module.exports = NotesView;
