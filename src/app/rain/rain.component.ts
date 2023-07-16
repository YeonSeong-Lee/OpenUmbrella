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
      this.engine.addCircle(window.innerWidth / 2, window.innerHeight / 2, 70,
      {
        isStatic: true,
        restitution: 0.42,
        label: 'umbrella',
        render: {
          sprite: {
          texture: 'assets/umbrella.svg',
          xScale: 1.2,
          yScale: 1.3
         }
       }
      });
      setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = 0;
        const radius = Math.random() * window.innerHeight / 50 + 5;
        this.engine.addCircle(x, y, radius, { restitution: Math.random() , friction: 0.1, frictionAir: 0.01 });
      }, 50);
      this.engine.run();
    }
}
