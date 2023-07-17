import { Component } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  developers = ['seongyle', 'susong']
  repos = [ {'kind': 'frontend', 'url': 'https://github.com/YeonSeong-Lee/OpenUmbrella'},
           {'kind': 'backend', 'url': 'https://github.com/SeungWoonSong/openUmbrella'}
          ]
}
