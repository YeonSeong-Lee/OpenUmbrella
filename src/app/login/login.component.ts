import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;

  headerOptions = {
    headers: {
      'Content-Type': 'application/json',
    } };

  login() {
    this.loading = true;
    fetch(`${environment.api}/auth_url`, this.headerOptions).then((res) => {
      res.json().then((data) => {
        this.loading = false;
        if (data.auth_url.includes('error')) {
          alert('Error');
          window.location.href = '/';
        } else {
          window.location.href = data.auth_url;
        }
      },
      );
    },
    ); 
  }
}