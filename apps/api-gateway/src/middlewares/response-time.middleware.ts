import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import responseTime from 'response-time';
import { Histogram } from 'prom-client';
import { NextFunction, Request, Response } from 'express';
import { REQUEST_PROCESSING_TIME } from '../measure/custom/constants';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  private readonly handler: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;

  constructor(
    @InjectMetric(REQUEST_PROCESSING_TIME)
    private readonly metric: Histogram<'method' | 'route' | 'status_code'>,
  ) {
    this.handler = responseTime((req: Request, res: Response, time: number) => {
      const route = req.baseUrl + req.path;
      console.log(`Request: ${req.method} ${route} Status: ${res.statusCode}`);
      this.metric
        .labels(req.method, route, res.statusCode.toString())
        .observe(time);
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.handler(req, res, () => {}); // manually run middleware
    next(); // continue to next middleware
  }
}
