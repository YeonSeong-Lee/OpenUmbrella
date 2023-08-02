import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  auth_url: string | undefined;

  headerOptions = {
    headers: {
      'Content-Type': 'application/json',
    } };

  login() {
    fetch(`${environment.api}/auth_url`, {
      method: 'GET',
      ...this.headerOptions,
    }).then((res) => {
      res.json().then((data) => {
        this.auth_url = data.auth_url;
      });
    },
    );
    if (!this.auth_url) return;
    fetch(this.auth_url).then((res) => {
      res.json().then((data) => {
        console.log(data, 'test');
        localStorage.setItem('jwt', data.jwt);
        window.location.href = '/';
      });
    }
  }
}
