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
      this.engine.addCircle(window.innerWidth / 2, window.innerHeight * 0.65, 150,
      {
        isStatic: false,
        restitution: 0.42,
        label: 'umbrella',
          render: {
              sprite: {
                texture: 'assets/umbrella.svg',
                xScale: 2.1,
                yScale: 2.3
               }
             }
          });
      this.engine.addCircle(window.innerWidth / 2, window.innerHeight * 0.2, 1, { isStatic: true, label: 'umbrella-pin' })
      const umbrella = this.engine.getBodyBtLabel('umbrella');
      const umbrellaPin = this.engine.getBodyBtLabel('umbrella-pin');
      if (umbrella && umbrellaPin) {
        this.engine.addConstraint(umbrella, umbrellaPin, { length: window.innerHeight * 0.42, label: 'umberlla-constraint', render: { visible: false } });
      }
      setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = 0;
        const radius = Math.random() * window.innerHeight / 50 + 5;
        this.engine.addCircle(x, y, radius, { restitution: 0.42 , friction: 0.1, frictionAir: 0.01 });
      }, 50);
      this.engine.run();
    }
}
