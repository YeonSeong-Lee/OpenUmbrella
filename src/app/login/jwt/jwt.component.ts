import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jwt',
  templateUrl: './jwt.component.html',
  styleUrls: ['./jwt.component.css'],
})
export class JwtComponent implements OnInit {  
  ngOnInit(): void {
    this.getJwt();
  }

  getJwt() {
    console.log('getJwt');
  }
}
