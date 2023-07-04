import { Injectable } from '@angular/core';
import * as Matter from 'matter-js';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  engine = Matter.Engine.create();
  render = Matter.Render.create({
    element: document.body,
    engine: this.engine,
    options: {
      background: 'transparent',
      wireframes: true,
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio
    }
  });
  runner = Matter.Runner.create();

  addRect(x: number, y: number, width: number, height: number) {
    const rect = Matter.Bodies.rectangle(x, y, width, height);
    Matter.World.add(this.engine.world, [rect]);
  }

  /*
  @description run the engine
  */
  run() {
    this.init();
    Matter.Render.run(this.render);
    Matter.Runner.run(this.runner, this.engine);
  }

  private init() {
    // add mouse control
    const mouse = Matter.Mouse.create(this.render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        render: {
          visible: true
        },
        stiffness: 0.2
      }
    });
    Matter.World.add(this.engine.world, mouseConstraint);

    // add groud
    const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 100, window.innerWidth, 1, {
      isStatic: true
    });
    Matter.World.add(this.engine.world, [ground]);

    window.addEventListener('resize', () => {
      this.render.bounds.max.x = window.innerWidth;
      this.render.bounds.max.y = window.innerHeight;
      this.render.options.width = window.innerWidth;
      this.render.options.height = window.innerHeight;
      this.render.canvas.width = window.innerWidth;
      this.render.canvas.height = window.innerHeight;
      Matter.Render.setPixelRatio(this.render, window.devicePixelRatio);
    });
  }
  // TODO: remove addEventListener
}
