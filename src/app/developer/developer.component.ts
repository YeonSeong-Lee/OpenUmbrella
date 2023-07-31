import { Component } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css'],
})
export class DeveloperComponent {
  repos = [
    { 'kind': 'frontend', 'url': 'https://github.com/YeonSeong-Lee/OpenUmbrella', 'developer': 'seongyle' },
    { 'kind': 'backend', 'url': 'https://github.com/SeungWoonSong/openUmbrella', 'developer': 'susong' },
  ];
}
