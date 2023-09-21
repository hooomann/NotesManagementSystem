import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-show-recent-notes',
  templateUrl: './show-recent-notes.component.html',
  styleUrls: ['./show-recent-notes.component.css']
})
export class ShowRecentNotesComponent {
  recentNotes: any[] = [];
  selectedNote: any | null = null;
  isEditing = false;

  // Track form changes
  titleDirty = false;
  contentDirty = false;
  importantDirty = false;

  constructor(
    private router: Router,
    private noteService: NoteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadRecentNotes();
  }

  loadRecentNotes() {
    this.noteService.getRecentNotes().subscribe(
      (notes) => {
        this.recentNotes = notes;
        console.log('response', notes);
        console.log('Authentication Successful......................');
      },
      (error) => {
        console.log('Authentication failed:', error);
      }
    );
  }

  showNoteDetails(note: any) {
    this.noteService.getNoteDetails(note.id).subscribe((noteDetails) => {
      this.selectedNote = noteDetails;
      // Delay the scroll by a short duration (e.g., 100 milliseconds)
      setTimeout(() => {
        window.scrollTo({ top: 3000, behavior: 'smooth' });
      }, 100);
    });
  }

  editNote() {
    this.isEditing = true;
    setTimeout(() => {
      window.scrollTo({ top: 3000, behavior: 'smooth' });
    }, 100);
  }

  cancelEdit() {
    this.isEditing = false;
  }

  updateNote() {
    if (this.selectedNote) {
      this.noteService.updateNote(this.selectedNote.id, this.selectedNote).subscribe(() => {
        this.isEditing = false;
        this.loadRecentNotes();
        this.showNoteDetails(this.selectedNote);
      });
    }
  }

  deleteNote() {
    if (this.selectedNote) {
      this.noteService.deleteNote(this.selectedNote.id).subscribe((response) => {
        this.selectedNote = null;
        console.log('response is...', response);
        // Reload the recent notes list after deletion.
        this.loadRecentNotes();
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }



  // Check if the update form is valid
  updateFormValid() {
    return this.isValidInput(this.selectedNote.title) && this.isValidInput(this.selectedNote.content)
  }



  // Reusable function to check for valid characters
  isValidInput(input: string) {
    return /^[A-Za-z@;&*+\-\s]*$/.test(input);
  }

  // Reusable function to show error message
  showErrorMessage(inputField: any) {
    return inputField.invalid && (inputField.dirty || inputField.touched);
  }
}
