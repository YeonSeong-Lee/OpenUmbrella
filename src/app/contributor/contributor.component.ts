import { Component } from '@angular/core';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css'],
})
export class ContributorComponent {
  contributors = ['jmaing', 'juha', 'jihokim2', 'seongyle', 'sokwon', 'hhwang', 'yukim'];
}
