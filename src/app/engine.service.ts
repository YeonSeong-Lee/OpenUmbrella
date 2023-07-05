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

  private updateByWindowSize() {
    this.engine.world.bodies.forEach(body => {
      if (body.position.x > window.innerWidth) {
        Matter.Body.setPosition(body, { x: window.innerWidth, y: body.position.y });
      }
      if (body.position.y > window.innerHeight) {
        Matter.Body.setPosition(body, { x: body.position.x, y: window.innerHeight });
      }
    })
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

    // add walls
    const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 1, { isStatic: true, label: 'ground', render: { visible: false }});
    const leftWall = Matter.Bodies.rectangle(0, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true, label: 'leftWall', render: { visible: false } });
    const rightWall = Matter.Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true, label: 'rightWall', render: { visible: false } });
    const ceiling = Matter.Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 1, { isStatic: true, label: 'ceiling', render: { visible: false } });
    Matter.World.add(this.engine.world, [ground, leftWall, rightWall, ceiling]);

    // set gravity to 0
    this.engine.gravity.y = 0;

    // add resize event
    window.addEventListener('resize', () => {
      this.render.bounds.max.x = window.innerWidth;
      this.render.bounds.max.y = window.innerHeight;
      this.render.options.width = window.innerWidth;
      this.render.options.height = window.innerHeight;
      this.render.canvas.width = window.innerWidth;
      this.render.canvas.height = window.innerHeight;
      Matter.Render.setPixelRatio(this.render, window.devicePixelRatio);
      Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight });
      Matter.Body.setPosition(leftWall, { x: 0, y: window.innerHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: window.innerWidth, y: window.innerHeight / 2 });
      Matter.Body.setPosition(ceiling, { x: window.innerWidth / 2, y: 0 });

      Matter.Body.scale(ground, window.innerWidth / ground.bounds.max.x, 1);
      Matter.Body.scale(leftWall, 1, window.innerHeight / leftWall.bounds.max.y);
      Matter.Body.scale(rightWall, 1, window.innerHeight / rightWall.bounds.max.y);
      Matter.Body.scale(ceiling, window.innerWidth / ceiling.bounds.max.x, 1);

      this.updateByWindowSize();
    });
  }
  // TODO: remove addEventListener
}
