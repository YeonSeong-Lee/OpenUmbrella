import { Injectable, OnDestroy } from '@angular/core';
import * as Matter from 'matter-js';

@Injectable({
  providedIn: 'root',
})
export class EngineService implements OnDestroy {

  private engine: Matter.Engine | undefined;

  private render: Matter.Render | undefined;

  private runner: Matter.Runner | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private clickHandler: ((this: Window, ev: MouseEvent) => any) | void | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private resizeHandler: ((this: Window, ev: UIEvent) => any) | void | undefined;

  addRect(x: number, y: number, width: number, height: number, options?: Matter.IBodyDefinition) {
    if (!this.engine) return;
    const rect = Matter.Bodies.rectangle(x, y, width, height, options);
    Matter.World.add(this.engine.world, [rect]);
  }

  addCircle(x: number, y: number, radius: number, options?: Matter.IBodyDefinition) {
    if (!this.engine) return;
    const circle = Matter.Bodies.circle(x, y, radius, options);
    Matter.World.add(this.engine.world, [circle]);
  }

  addConstraint(bodyA: Matter.Body, bodyB: Matter.Body, options?: Matter.IConstraintDefinition) {
    if (!this.engine) return;
    const constraint = Matter.Constraint.create({
      bodyA: bodyA,
      bodyB: bodyB,
      ...options,
    });
    Matter.World.add(this.engine.world, [constraint]);
  }

  getBodyByLabel(label: string) {
    if (!this.engine) return;
    return this.engine.world.bodies.find(body => body.label === label);
  }

  getConstraintByLabel(label: string) {
    if (!this.engine) return;
    return this.engine.world.constraints.find(constraint => {
      return constraint.label === label;
    });
  }

  setAngle(body: Matter.Body, angle: number) {
    if (!this.engine) return;
    Matter.Body.setAngle(body, angle);
  }

  /*
  @description run the engine
  */
  run() {
    this.init();
    if (!this.engine || !this.render || !this.runner) return;
    Matter.Render.run(this.render);
    Matter.Runner.run(this.runner, this.engine);
  }

  private updateByWindowSize() {
    if (!this.render) return;
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
    Matter.Render.setPixelRatio(this.render, window.devicePixelRatio);
  }

  private addCircleInMousePoint(element: MouseEvent) {
    const mousePosition = { x: element.clientX, y: element.clientY };
    const radius = Math.random() * window.innerHeight / 50 + 5;
    this.addCircle(mousePosition.x, mousePosition.y, radius, { restitution: 0.42, friction: 0.1, frictionAir: 0.01 });
  }

  private init() {
    this.engine = Matter.Engine.create(
    );
    
    this.render = Matter.Render.create({
      canvas: document.getElementById('rain-scene') as HTMLCanvasElement,
      engine: this.engine,
      options: {
        background: 'transparent',
        wireframes: false,
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
      },
    });
    
    this.runner = Matter.Runner.create();

    this.engine.world.bodies.forEach(body => {
      body.frictionAir = 0;
      body.friction = 0;
      Matter.Body.setInertia(body, Infinity);
    });

    Matter.Events.on(this.engine, 'beforeUpdate', () => {
      const umbrella = this.getBodyByLabel('umbrella');
      if (!umbrella) return;
      const tolerance = 0.42;
      const maxAngle =  - Math.PI / 5 + tolerance;
      const minAngle = - Math.PI / 5 - tolerance; 
      if (umbrella.angle < minAngle) {
        Matter.Body.setAngle(umbrella, minAngle);
      }
      if (umbrella.angle > maxAngle) {
        Matter.Body.setAngle(umbrella, maxAngle);
      }
    });

    this.resizeHandler = this.updateByWindowSize.bind(this);
    window.addEventListener('resize', this.resizeHandler);
    this.clickHandler = this.addCircleInMousePoint.bind(this);
    window.addEventListener('click', this.clickHandler);
  }

  ngOnDestroy(): void {
    if (!this.engine || !this.render || !this.runner) return;
    Matter.Render.stop(this.render);
    Matter.Runner.stop(this.runner);
    Matter.World.clear(this.engine.world, true);
    Matter.Engine.clear(this.engine);
    this.render.canvas.remove();
    if (!this.resizeHandler || !this.clickHandler) return;
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('click', this.clickHandler);
  }
}
