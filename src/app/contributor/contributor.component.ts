import { Component } from '@angular/core';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css'],
})
export class ContributorComponent {
  donators = ['jmaing', 'juha', 'jihokim2', 'seongyle', 'sokwon', 'hhwang', 'yukim'];

  operators = ['seongyle', 'yonghyle', 'sunhwang', 'sooyokim', 'hhwang', 'wochae', 'seonhoki', 'jaewchoi', 'juha'];
}
