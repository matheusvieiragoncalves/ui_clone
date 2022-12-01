import { PrismaUsersRepository } from '../../repositories/prisma/PrismaUsersRepository';
import { UserController } from './UserController';
import { UserService } from './UserService';

export const userFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const userService = new UserService(usersRepository);
  const userController = new UserController(userService);
  return userController;
};
