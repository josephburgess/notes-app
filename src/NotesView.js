class NotesView {
  constructor(notesModel, notesClient) {
    this.notesModel = notesModel;
    this.notesClient = notesClient;
    this.mainContainerEl = document.querySelector('#main-container');
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
    let notes = [this.notesModel.getNotes().pop()];

    notes.forEach((note) => {
      let noteDiv = document.createElement('div');
      noteDiv.className = 'note';
      noteDiv.innerHTML = note;
      this.mainContainerEl.append(noteDiv);
    });
  }

  displayNotesFromApi() {
    this.notesClient.loadNotes((notes) => {
      this.notesModel.setNotes(notes);
      this.displayNotes();
    });
  }
}
module.exports = NotesView;
