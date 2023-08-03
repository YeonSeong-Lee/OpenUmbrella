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
    this.engine.run();
    const radius = window.innerWidth > 414 ? 100 :  window.innerWidth * 0.22;
    const halfAssetWidth = 75;
    const halfAssetHeight = 75;
    this.engine.addCircle(window.innerWidth / 2, window.innerHeight * 0.65, radius,
      {
        isStatic: false,
        restitution: 0.42,
        label: 'umbrella',
        render: {
          sprite: {
            texture: 'assets/umbrella.svg',
            xScale: radius / halfAssetWidth,
            yScale: radius / halfAssetHeight * 1.2,
          },
        },
      });
    this.engine.addCircle(window.innerWidth / 2, window.innerHeight * 0.2, 1, { isStatic: true, label: 'umbrella-pin', render: { visible: true }, isSensor: true });
    const umbrella = this.engine.getBodyByLabel('umbrella');
    const umbrellaPin = this.engine.getBodyByLabel('umbrella-pin');
    if (umbrella && umbrellaPin) {
      this.engine.setAngle(umbrella, - Math.PI / 5);
      this.engine.addConstraint(umbrella, umbrellaPin, { length: window.innerHeight * 0.42, label: 'umberlla-constraint', render: { visible: true } });
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && this.intervalId) {
        window.clearInterval(this.intervalId);
      } else {
        this.runRain(this.rainProbability || 0);
      }
    });
  }

  private getCurrentGaepoDongWeather() {
    const baseDate = this.getBaseDate();
    const baseTime = this.getBaseTime();
    const url = `${environment.weatherEndpoint}/getVilageFcst?serviceKey=${environment.weatherKey}&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=62&ny=25`;
    fetch(url)
      .then(response => response.json())
      .then(data => data.response.body?.items.item.filter((item: { category: string }) => item.category === 'POP')[0].fcstValue)
      .then(pop => this.rainProbability = pop)
      .then(this.runRain.bind(this))
      .catch(error => console.error(error));
  }

  private runRain(rainProbability: number) {
    if (document.visibilityState === 'hidden') {
      return;
    }
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
    const baseTimes = ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'];

    // 현재 시간을 구합니다.
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour.toString().padStart(2, '0')}${currentMinute.toString().padStart(2, '0')}`;
  
    if (currentTime < '0200') return '2300';
    // API 제공 시간과 비교하여 현재 시간보다 작은 마지막 base_time을 찾습니다.
    for (let i = baseTimes.length - 1; i >= 0; i--) {
      if (baseTimes[i] < currentTime) {
        return baseTimes[i];
      }
    }
    return '2300';
  }

  ngOnDestroy(): void {
    this.engine.ngOnDestroy();
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}
