class NotesView {
  constructor(notesModel) {
    this.notesModel = notesModel;
    this.mainContainerEl = document.querySelector('#main-container');
  }

  displayNotes() {
    let notes = this.notesModel.getNotes();

    notes.forEach((note) => {
      let noteDiv = document.createElement('div');
      noteDiv.className = 'note';
      noteDiv.innerHTML = note;
      this.mainContainerEl.append(noteDiv);
    });
  }
}
module.exports = NotesView;
