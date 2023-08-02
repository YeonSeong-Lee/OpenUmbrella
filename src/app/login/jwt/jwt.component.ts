import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.css'],
})
export class JwtComponent implements OnInit {  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getJwt();
  }

  getJwt() {
    const jwtToken = this.route.snapshot.queryParamMap.get('jwt_token');
    if (jwtToken) {
      document.cookie = `jwt_token=${jwtToken}`;
      console.log('success, jwt_token: ', jwtToken);
      window.location.href = '/share';
    }
  }
}
