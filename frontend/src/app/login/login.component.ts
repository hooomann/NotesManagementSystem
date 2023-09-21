// login.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  userPassword: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  login(): void {
    const loginData = {
      userName: this.userName,
      userPassword: this.userPassword
    };

    this.authService.login(loginData)
      .subscribe(
        response => {
          console.log("Authentication Successful...");
          localStorage.setItem('jwtToken', response.jwtToken);
          this.router.navigate(['/notes']);
        },
        error => {
          this.errorMessage = 'Invalid Login Credentials';
          console.log('Authentication failed:', error);
        }
      );
  }

}
