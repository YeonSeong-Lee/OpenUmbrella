import { Injectable } from '@angular/core';
import * as Matter from 'matter-js';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  engine = Matter.Engine.create(
  );
  render = Matter.Render.create({
    element: document.body,
    canvas: document.getElementById('rain') as HTMLCanvasElement,
    engine: this.engine,
    options: {
      background: 'transparent',
      wireframes: false,
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio
    }
  });
  runner = Matter.Runner.create();

  addRect(x: number, y: number, width: number, height: number, options?: Matter.IBodyDefinition) {
    const rect = Matter.Bodies.rectangle(x, y, width, height, options);
    Matter.World.add(this.engine.world, [rect]);
  }

  addCircle(x: number, y: number, radius: number, options?: Matter.IBodyDefinition) {
    const circle = Matter.Bodies.circle(x, y, radius, options);
    Matter.World.add(this.engine.world, [circle]);
  }

  /*
  @description run the engine
  */
  run() {
    this.init();
    Matter.Render.run(this.render);
    Matter.Runner.run(this.runner, this.engine);
  }

  private updateByWindowSize() {
    this.engine.world.bodies.forEach(body => {
      if (body.position.x > window.innerWidth) {
        Matter.Body.setPosition(body, { x: window.innerWidth, y: body.position.y });
      }
      if (body.position.y > window.innerHeight) {
        Matter.Body.setPosition(body, { x: body.position.x, y: window.innerHeight });
      }
    })
    this.render.bounds.max.x = window.innerWidth;
    this.render.bounds.max.y = window.innerHeight;
    this.render.options.width = window.innerWidth;
    this.render.options.height = window.innerHeight;
    this.render.canvas.width = window.innerWidth;
    this.render.canvas.height = window.innerHeight;
    Matter.Render.setPixelRatio(this.render, window.devicePixelRatio);
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

    this.engine.world.bodies.forEach(body => {
      body.frictionAir = 0;
      body.friction = 0;
      Matter.Body.setInertia(body, Infinity);
    })


    // add resize event
    window.addEventListener('resize',
      this.updateByWindowSize.bind(this)
    );
  }

  ngOnDestroy(): void {
    Matter.Engine.clear(this.engine);
    Matter.Render.stop(this.render);
    Matter.Runner.stop(this.runner);
    window.removeEventListener('resize', this.updateByWindowSize.bind(this));
  }
}
