import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import AbstractController from '../../../core/AbstractController';
import { UserService } from './UserService';

interface AuthRequest extends Request {
  userId?: number;
  error?: {
    email?: string;
    password?: string;
  };
}

class UserController extends AbstractController {
  constructor(private userService: UserService) {
    super();
  }

  public async create(
    request: AuthRequest,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const schema = Yup.object().shape({
      phone: Yup.string().required(),
      name: Yup.string().required()
    });

    await this.validateData(request, response, schema);

    const { phone, name } = request.body;

    try {
      const user = await this.userService.create({ phone, name });
      return response.json(user);
    } catch (err) {
      return next(err);
    }
  }

  public async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const users = await this.userService.findAll();
      return response.json(users);
    } catch (err) {
      return next(err);
    }
  }

  public async findById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { id } = request.params;

    try {
      const user = await this.userService.findById(Number(id));
      return response.json(user);
    } catch (err) {
      return next(err);
    }
  }

  public async delete(
    request: AuthRequest,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { id } = request.params;

    try {
      const user = await this.userService.delete(Number(id));
      return response.json(user);
    } catch (err) {
      return next(err);
    }
  }
}

export { UserController };
