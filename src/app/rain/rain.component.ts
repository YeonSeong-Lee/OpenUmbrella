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

  uvIndexCategory: string | undefined;

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
    this.engine.addCircle(window.innerWidth / 2, window.innerHeight * 0.2, 1, { isStatic: true, label: 'umbrella-pin', render: { visible: false }, isSensor: true });
    const umbrella = this.engine.getBodyByLabel('umbrella');
    const umbrellaPin = this.engine.getBodyByLabel('umbrella-pin');
    if (umbrella && umbrellaPin) {
      this.engine.setAngle(umbrella, - Math.PI / 5);
      this.engine.addConstraint(umbrella, umbrellaPin, { length: window.innerHeight * 0.42, label: 'umberlla-constraint', render: { visible: false } });
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && this.intervalId) {
        window.clearInterval(this.intervalId);
      } else {
        this.runRain(this.rainProbability || 0);
      }
    });
  }

  /**
   * @warn becaruful, this function is also runRain,
   */
  // TODO: refactoring, separate getCurrentGaepoDongWeather and runRain
  private getCurrentGaepoDongWeather() {
    const url = `${environment.api}/weather`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.rainProbability = data.rain_probability; 
        this.uvIndexCategory = data.uv_index_category;
        return data.rain_probability;
      })
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

  ngOnDestroy(): void {
    this.engine.ngOnDestroy();
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}
