import { Component, OnDestroy, OnInit } from '@angular/core';
import { EngineService } from '../engine.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.css'],
})
export class RainComponent implements OnInit, OnDestroy {
  rainProbability:  number | undefined;

  intervalId: number | undefined;

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
    this.engine.addCircle(window.innerWidth / 2, window.innerHeight * 0.2, 1, { isStatic: true, label: 'umbrella-pin', render: { visible: false } });
    const umbrella = this.engine.getBodyBtLabel('umbrella');
    const umbrellaPin = this.engine.getBodyBtLabel('umbrella-pin');
    if (umbrella && umbrellaPin) {
      this.engine.addConstraint(umbrella, umbrellaPin, { length: window.innerHeight * 0.42, label: 'umberlla-constraint', render: { visible: false } });
    }
    this.engine.run();
  }

  private getCurrentGaepoDongWeather() {
    const baseDate = this.getBaseDate();
    const baseTime = this.getBaseTime();
    console.log(baseDate, baseTime);
    const url = `${environment.weatherEndpoint}/getVilageFcst?serviceKey=${environment.weatherKey}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=62&ny=25`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => data.response.body?.items.item.filter((item: { category: string }) => item.category === 'POP')[0].fcstValue)
      .then(pop => this.rainProbability = pop)
      .then(this.runRain.bind(this))
      .catch(error => console.error(error));
  }

  private runRain(rainProbability: number) {
    let delta = 1000 / rainProbability;
    if (delta < 12.5) {
      delta = 12.5;
    }
    if (delta > 1000) {
      delta = 100;
    }
    this.intervalId = window.setInterval(() => {
      const radius = Math.random() * window.innerHeight / 50 + 5;
      this.engine.addCircle(Math.random() * window.innerWidth, 0, radius, { restitution: 0.42, friction: 0.1, frictionAir: 0.01 });
      // rain probability 80% over -> add 2 raindrops per delta
      if (delta === 12.5) {
        this.engine.addCircle(Math.random() * window.innerWidth, 0, radius, { restitution: 0.42, friction: 0.1, frictionAir: 0.01 });
        this.engine.addCircle(Math.random() * window.innerWidth, 0, radius, { restitution: 0.42, friction: 0.1, frictionAir: 0.01 });
      }
    }, delta * 10);
  }

  private getBaseDate() {
    if (new Date().getHours() < 1) {
      return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10).replace(/-/g, '');
    }
    return new Date().toISOString().slice(0, 10).replace(/-/g, '');
  }

  private getBaseTime() {
    const date = new Date();
    const minute = date.getMinutes();
    let hour = date.getHours();
    let baseTime;
    if (hour % 3 !== 0) {
      hour = hour - (hour % 3);
    }
    if (hour < 2) {
      baseTime = '2300';
    } else if (minute < 15) {
      baseTime = (hour - 3) + '00';
    } else {
      baseTime = hour + '00';
    }

    baseTime = baseTime.padStart(4, '0');
    return baseTime;
  }

  ngOnDestroy(): void {
    this.engine.ngOnDestroy();
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}
