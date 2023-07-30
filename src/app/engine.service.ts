import { Injectable, OnDestroy } from '@angular/core';
import * as Matter from 'matter-js';

@Injectable({
  providedIn: 'root',
})
export class EngineService implements OnDestroy {
  engine = Matter.Engine.create(
  );

  render = Matter.Render.create({
    element: document.body,
    engine: this.engine,
    options: {
      background: 'transparent',
      wireframes: false,
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
    },
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

  addConstraint(bodyA: Matter.Body, bodyB: Matter.Body, options?: Matter.IConstraintDefinition) {
    const constraint = Matter.Constraint.create({
      bodyA: bodyA,
      bodyB: bodyB,
      ...options,
    });
    Matter.World.add(this.engine.world, [constraint]);
  }

  getBodyByLabel(label: string) {
    return this.engine.world.bodies.find(body => body.label === label);
  }

  getConstraintByLabel(label: string) {
    return this.engine.world.constraints.find(constraint => {
      return constraint.label === label;
    });
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
    Matter.Render.setPixelRatio(this.render, window.devicePixelRatio);
    const umbrella = this.getBodyByLabel('umbrella');
    if (umbrella) {
      Matter.Body.setPosition(umbrella, { x: window.innerWidth / 2, y: window.innerHeight * 0.65 });
    }
    const umbrellaPin = this.getBodyByLabel('umbrella-pin');
    if (umbrellaPin) {
      Matter.Body.setPosition(umbrellaPin, { x: window.innerWidth / 2, y: window.innerHeight * 0.2 });
    }
    const umbrellaConstraint = this.getConstraintByLabel('umberlla-constraint');
    if (umbrellaConstraint) {
      umbrellaConstraint.length = window.innerHeight * 0.42;
    }
    this.render.bounds.max.x = window.innerWidth;
    this.render.bounds.max.y = window.innerHeight;
    this.render.options.width = window.innerWidth;
    this.render.options.height = window.innerHeight;
    this.render.canvas.width = window.innerWidth;
    this.render.canvas.height = window.innerHeight;
  }

  private addCircleInMousePoint(element: MouseEvent) {
    const mousePosition = { x: element.clientX, y: element.clientY };
    const radius = Math.random() * window.innerHeight / 50 + 5;
    this.addCircle(mousePosition.x, mousePosition.y, radius, { restitution: 0.42, friction: 0.1, frictionAir: 0.01 });
  }

  private init() {
    this.engine.world.bodies.forEach(body => {
      body.frictionAir = 0;
      body.friction = 0;
      Matter.Body.setInertia(body, Infinity);
    });

    window.addEventListener('resize',
      this.updateByWindowSize.bind(this),
    );
    window.addEventListener('click',
      this.addCircleInMousePoint.bind(this),
    );
  }

  ngOnDestroy(): void {
    Matter.Render.stop(this.render);
    Matter.Runner.stop(this.runner);
    Matter.World.clear(this.engine.world, true);
    Matter.Engine.clear(this.engine);
    this.render.canvas.remove();
    window.removeEventListener('resize', this.updateByWindowSize.bind(this));
    window.removeEventListener('click', this.addCircleInMousePoint.bind(this));
  }
}
