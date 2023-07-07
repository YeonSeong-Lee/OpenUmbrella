import { Component, OnInit } from '@angular/core';
import { EngineService } from '../engine.service';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.css']
})
export class RainComponent implements OnInit {

    constructor(private engine: EngineService) {}

    ngOnInit(): void {
      setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = 0;
        const width = Math.random() * 100;
        const height = Math.random() * 100;
        this.engine.addRect(x, y, width, height);
      }, 1000);
      this.engine.run();
    }

}
