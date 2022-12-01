import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { CustomError } from './app/CustomError/CustomError';
import { UserRoutes } from './routes/users';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.clientErrorHandler();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use('/users', UserRoutes);
  }

  private clientErrorHandler(): void {
    this.express.use(
      (
        err: CustomError,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof CustomError) {
          return response.status(err.status).json(err.error);
        } else {
          return response.status(500).json({
            status: 'Error',
            message: `Internal server error - ${err}`
          });
        }
      }
    );
  }
}

export default new App().express;
