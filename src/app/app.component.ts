import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit { 
  title = 'OpenUmbrella';

  links = [
    { displayName: '우산현황', url: 'history', icon: 'beach_access' }, 
    { displayName: '대출/반납', url: 'share', icon: 'qr_code_scanner' },
    { displayName: '기여자', url: 'contributor', icon: 'group' },
  ];

  noImportantLinks = [ 
    { displayName: '예보(beta)', url: 'rain', icon: 'cloud' },
    { displayName: '개발자', url: 'developer', icon: 'code' }, 
  ];

  activeLink: string | undefined;

  onSelectActiveLink(url: string) {
    this.activeLink = url;
  }

  constructor() {
    inject();
  }
  
  ngOnInit(): void {
    this.activeLink = window.location.pathname.split('/')[1];
  }
}
