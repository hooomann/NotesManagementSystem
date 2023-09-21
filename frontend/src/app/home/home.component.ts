import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isNavbarOpen = false;

  constructor(private authService: AuthService, private router: Router) { }

  // Checks if the user is logged in by verifying the presence of 'jwtToken' and 'userRole' in localStorage
  isLoggedIn(): boolean {
    return this, this.authService.isAuthenticated();
  }

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  // Function to check if the current route is the login page
  isLoginPage(): boolean {
    return this.router.url === '/';
  }
  // Function to check if the current route is the login page
  isSignUpPage(): boolean {
    return this.router.url === '/signup';
  }
  // Function to check if the current route is the login page
  isAddNotePage(): boolean {
    return this.router.url === '/addNote';
  }
  // Logs out the user by clearing the localStorage
  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"])
  }

}
