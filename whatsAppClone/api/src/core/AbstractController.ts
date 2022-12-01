import { Request, Response } from 'express';
import * as Yup from 'yup';
import { CustomError } from '../app/CustomError/CustomError';
import '../config/yupErrorObject';

export default abstract class AbstractController {
  public async validateData(
    req: Request,
    res: Response,
    schema: Yup.ObjectSchema<any>
  ) {
    const error: any = {};

    await schema.validate(req.body, { abortEarly: false }).catch((err: any) => {
      err.inner.forEach((fieldError: any) => {
        error[fieldError.path] = fieldError.message;
      });
      
      throw new CustomError(400, { error });
    });

    return {};
  }
}
