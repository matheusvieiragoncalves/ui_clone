import { Router } from 'express';
import { userFactory } from '../app/modules/user/UserFactory';

export const UserRoutes = Router();

UserRoutes.get('', (request, response, next) =>
  userFactory().findAll(request, response, next)
);

UserRoutes.get('/:id', (request, response, next) =>
  userFactory().findById(request, response, next)
);

// UserRoutes.put('', (request, response, next) =>
//   userFactory().update(request, response, next)
// );

UserRoutes.delete('/:id', (request, response, next) =>
  userFactory().delete(request, response, next)
);
