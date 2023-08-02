import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  headerOptions = {
    headers: {
      'Content-Type': 'application/json',
    } };

  login() {
    fetch(`${environment.api}/auth_url`, this.headerOptions).then((res) => {
      res.json().then((data) => {
        window.location.href = data.auth_url;
      },
      );
    },
    ); 
  }
}