import { Component } from '@angular/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OpenUmbrella';

  constructor() {
    inject();
  }
}
