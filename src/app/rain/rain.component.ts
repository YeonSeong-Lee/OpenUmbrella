import { Component, OnInit } from '@angular/core';
import { EngineService } from '../engine.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.css'],
})
export class RainComponent implements OnInit {
  rainProbability:  number | undefined;

  constructor(private engine: EngineService) {}

  ngOnInit(): void {
    this.getCurrentGaepoDongWeather();
    this.engine.addCircle(window.innerWidth / 2, window.innerHeight * 0.65, 150,
      {
        isStatic: false,
        restitution: 0.42,
        label: 'umbrella',
        render: {
          sprite: {
            texture: 'assets/umbrella.svg',
            xScale: 2.1,
            yScale: 2.3,
          },
        },
      });
    this.engine.addCircle(window.innerWidth / 2, window.innerHeight * 0.2, 1, { isStatic: true, label: 'umbrella-pin' });
    const umbrella = this.engine.getBodyBtLabel('umbrella');
    const umbrellaPin = this.engine.getBodyBtLabel('umbrella-pin');
    if (umbrella && umbrellaPin) {
      this.engine.addConstraint(umbrella, umbrellaPin, { length: window.innerHeight * 0.42, label: 'umberlla-constraint', render: { visible: false } });
    }
    this.engine.run();
  }

  private getCurrentGaepoDongWeather() {
    const baseDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = this.getBaseTime();
    const url = `${environment.weatherEndpoint}/getVilageFcst?serviceKey=${environment.weatherKey}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=62&ny=25`;
    fetch(url)
      .then(response => response.json())
      .then(data => data.response.body?.items.item.filter((item: any) => item.category === 'POP')[0].fcstValue)
      .then(pop => this.rainProbability = pop)
      .then(this.runRain.bind(this))
      .catch(error => console.error(error));
  }

  // TODO: delte setInterval ID when component is destroyed
  private runRain(rainProbability: number) {
    let delta = 1000 / rainProbability;
    if (delta < 12.5) {
      delta = 12.5;
    }
    if (delta > 1000) {
      delta = 100;
    }
    setInterval(() => {
      const radius = Math.random() * window.innerHeight / 50 + 5;
      this.engine.addCircle(Math.random() * window.innerWidth, 0, radius, { restitution: 0.42, friction: 0.1, frictionAir: 0.01 });
      // rain probability 80% over -> add 2 raindrops per delta
      if (delta === 12.5) {
        this.engine.addCircle(Math.random() * window.innerWidth, 0, radius, { restitution: 0.42, friction: 0.1, frictionAir: 0.01 });
        this.engine.addCircle(Math.random() * window.innerWidth, 0, radius, { restitution: 0.42, friction: 0.1, frictionAir: 0.01 });
      }
    }, delta * 10);
  }

  private getBaseTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    let baseTime;
    if (minute < 45 && hour === 0) {
      baseTime = '2300';
    } else if (minute < 45) {
      baseTime = (hour - 1) + '00';
    } else {
      baseTime = hour + '00';
    }

    baseTime = baseTime.padStart(4, '0');
    return baseTime;
  }
}
