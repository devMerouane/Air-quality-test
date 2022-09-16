import { Router as ExpressRouter } from 'express';

export abstract class Router {
  router: ExpressRouter = null;

  constructor() {
    this.router = ExpressRouter();
    this.define();
  }

  define(): void {}
}
