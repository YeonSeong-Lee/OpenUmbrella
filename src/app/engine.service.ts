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
  ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 1.2, window.innerWidth / 2, 42, { isStatic: true, label: 'ground', render: { visible: true }});
  leftWall = Matter.Bodies.rectangle(0, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true, label: 'leftWall', render: { visible: false } });
  rightWall = Matter.Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true, label: 'rightWall', render: { visible: false } });
  ceiling = Matter.Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 1, { isStatic: true, label: 'ceiling', render: { visible: false } });

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
    this.render.bounds.max.x = window.innerWidth;
    this.render.bounds.max.y = window.innerHeight;
    this.render.options.width = window.innerWidth;
    this.render.options.height = window.innerHeight;
    this.render.canvas.width = window.innerWidth;
    this.render.canvas.height = window.innerHeight;
    Matter.Render.setPixelRatio(this.render, window.devicePixelRatio);
    Matter.Body.setPosition(this.ground, { x: window.innerWidth / 2, y: window.innerHeight / 1.2 });
    Matter.Body.setPosition(this.leftWall, { x: 0, y: window.innerHeight / 2 });
    Matter.Body.setPosition(this.rightWall, { x: window.innerWidth, y: window.innerHeight / 2 });
    Matter.Body.setPosition(this.ceiling, { x: window.innerWidth / 2, y: 0 });

    Matter.Body.scale(this.ground, 1, 1);
    Matter.Body.scale(this.leftWall, 1, window.innerHeight / this.leftWall.bounds.max.y);
    Matter.Body.scale(this.rightWall, 1, window.innerHeight / this.rightWall.bounds.max.y);
    Matter.Body.scale(this.ceiling, window.innerWidth / this.ceiling.bounds.max.x, 1);

  }

  private keyboardHandler(event: KeyboardEvent) {
    if (event.key === ' ') {
      this.addRect(Math.random() * window.innerWidth, 0, Math.random() * 100, Math.random() * 100);
    }
    if (event.key === 'ArrowLeft') {
      Matter.Body.translate(this.ground, { x: -10, y: 0 });
    }
    if (event.key === 'ArrowRight') {
      Matter.Body.translate(this.ground, { x: 10, y: 0 });
    }
    // rotate
    if (event.key === 'ArrowUp') {
      (() => {
        Matter.Body.setCentre(this.ground, { x: window.innerWidth / 2, y: window.innerHeight / 1.2 })
        Matter.Body.setCentre(this.ground, { x: (this.ground.position.x + window.innerWidth / 3) - window.innerWidth / 2, y: window.innerHeight / 1.2 }  )
        Matter.Body.rotate(this.ground, -0.42);
        setTimeout(() => {
          Matter.Body.rotate(this.ground, 0.42);
          Matter.Body.setCentre(this.ground, { x: window.innerWidth / 2, y: window.innerHeight / 1.2 })
        }, 500);
      })();
    }
    if (event.key === 'ArrowDown') {
      (() => {
        Matter.Body.setCentre(this.ground, { x: window.innerWidth / 2, y: window.innerHeight / 1.2 })
        Matter.Body.setCentre(this.ground, { x: (this.ground.position.x + window.innerWidth / 3), y: window.innerHeight / 1.2 }  )
        Matter.Body.rotate(this.ground, 0.42);
        setTimeout(() => {
          Matter.Body.rotate(this.ground, -0.42);
          Matter.Body.setCentre(this.ground, { x: window.innerWidth / 2, y: window.innerHeight / 1.2 })
        }, 500);
      })();
    }
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
    Matter.World.add(this.engine.world, [this.ground, this.leftWall, this.rightWall, this.ceiling]);

    // add resize event
    window.addEventListener('resize',
      this.updateByWindowSize.bind(this)
    );

    // add event listener for keydown
    window.addEventListener('keydown', this.keyboardHandler.bind(this));
  }

  ngOnDestroy(): void {
    Matter.Engine.clear(this.engine);
    Matter.Render.stop(this.render);
    Matter.Runner.stop(this.runner);
    window.removeEventListener('resize', this.updateByWindowSize.bind(this));
    window.removeEventListener('keydown', this.keyboardHandler.bind(this));
  }
}
