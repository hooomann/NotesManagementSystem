import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './addnote/addnote.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ShowRecentNotesComponent } from './show-recent-notes/show-recent-notes.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent },
  { path: 'notes', component: ShowRecentNotesComponent, canActivate: [authGuard] },
  { path: 'addNote', component: AddNoteComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
