import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddNoteComponent {
  newNote: any = {};

  constructor(private noteService: NoteService, private router: Router) { }

  addNote() {
    if (this.newNote.title && this.newNote.content && this.newNote.important) {
      // Check for valid characters using the reusable function
      if (this.isValidInput(this.newNote.title) && this.isValidInput(this.newNote.content)) {
        this.noteService.addNote(this.newNote).subscribe(() => {
          this.router.navigate(['/notes']);
          console.log('Note added successfully');
        });
      }
    }
  }

  goBack() {
    window.history.back();
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
