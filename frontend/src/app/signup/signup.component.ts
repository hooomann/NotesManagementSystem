import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userName: string = '';
  userFirstName: string = '';
  userLastName: string = '';
  userPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  // Perform user registration
  signup(signupForm: any): void {
    const newUser = {
      userName: this.userName,
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      userPassword: this.userPassword
    };
    this.authService.signUp(newUser).subscribe(
      response => {
        // Handle successful signup
        if (response === null) {
          this.message = "Username already taken!";
          return;
        }
        console.log('User registered successfully:', response);
        this.message = 'User registered successfully!';
        this.router.navigate(['/']);

        // Redirect or perform other actions on successful signup
      },
      error => {
        // Handle signup error
        console.log('User registration failed:', error);
        this.message = 'User registration failed.';

        // Display an error message to the user
      }
    );
  }

  // Navigate back to the home page
  goBack(): void {
    this.router.navigate(['']);
  }
}
