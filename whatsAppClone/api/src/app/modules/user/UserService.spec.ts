import { CustomError } from '../../CustomError/CustomError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepositories';
import { UserService } from './UserService';
import faker from 'faker';
import { IUser } from '../../@types/IUser';

describe('service',() => {
  let userData: IUser;

  beforeEach(() => {
    userData = {
      email: faker.internet.email(),
      password: faker.internet.password(10),
    };
  });
  
  describe('Create user', () => {
    let usersRepository: IUsersRepository;
    let userService: UserService;

    beforeAll(() => {
      usersRepository = new UsersRepositoryInMemory();
      userService = new UserService(usersRepository);
    });
    
    it('should be able to create a new user', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');
    });

    it('should not be able to create an existing user', async () => {
      await userService.create(userData);

      await expect(userService.create(userData)).rejects.toEqual(
        new CustomError(401, { email: 'E-mail já cadastrado!' })
      );
    });
  });

  describe('FindAll user', () => {
    let usersRepository: IUsersRepository;
    let userService: UserService;

    beforeAll(() => {
      usersRepository = new UsersRepositoryInMemory();
      userService = new UserService(usersRepository);
    });

    it('should be able to find all users', async () => {
      await userService.create(userData);
     
      const userDataTwo = {
        email: faker.internet.email(),
        password: faker.internet.password(10),
      };

      await userService.create(userDataTwo);

      const response = await userService.findAll();

      expect(response).toHaveLength(2);
    });
  });

  describe('FindById user', () => {
    let usersRepository: IUsersRepository;
    let userService: UserService;

    beforeAll(() => {
      usersRepository = new UsersRepositoryInMemory();
      userService = new UserService(usersRepository);
    });

    it('should be able to create a new user and find your data by id', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');
      expect(await userService.findById(user.id || 0)).toHaveProperty(
        'id',
        user.id
      );
    });

    it('should not be able to find user data by id not existing', async () => {
      await expect(userService.findById(-1)).rejects.toEqual(
        new CustomError(404, { message: 'User not found!' })
      );
    });
  });

  describe('Update user', () => {
    let usersRepository: IUsersRepository;
    let userService: UserService;

    beforeEach(() => {
      usersRepository = new UsersRepositoryInMemory();
      userService = new UserService(usersRepository);
    });

    it('should be able to create a new user and update email', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');
    });

    it('should not not be able to update data user with id invalid', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');

      await expect(
        userService.update({
          id: 0,
          email: faker.internet.email(),
          password: faker.internet.password(),
          oldPassword: faker.internet.password(),
        })
      ).rejects.toEqual(new CustomError(404, { message: 'User not found!' }));
    });

    it('should not not be able to update data user with id not existing', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');

      await expect(
        userService.update({
          id: -1,
          email: faker.internet.email(),
          password: faker.internet.password(),
          oldPassword: faker.internet.password(),
        })
      ).rejects.toEqual(new CustomError(404, { message: 'User not found!' }));
    });

    it('should not not be able to update email existing', async () => {
      const userOne = await userService.create(userData);

      expect(userOne).toHaveProperty('id');

      const userDataTwo = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const userTwo = await userService.create(userDataTwo);

      expect(userTwo).toHaveProperty('id');

      await expect(
        userService.update({
          id: userOne.id,
          email: userTwo.email,
          password: faker.internet.password(),
          oldPassword: faker.internet.password(),
        })
      ).rejects.toEqual(
        new CustomError(400, { message: 'E-mail já cadastrado!' })
      );
    });

    it('should not not be able to update password incorrect ', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');

      await expect(
        userService.update({
          id: user.id,
          email: user.email,
          password: faker.internet.password(),
          oldPassword: faker.internet.password(),
        })
      ).rejects.toEqual(new CustomError(400, { message: 'Senha incorreta' }));
    });
  });

  describe('Delete user', () => {
    let usersRepository: IUsersRepository;
    let userService: UserService;

    beforeEach(() => {
      usersRepository = new UsersRepositoryInMemory();
      userService = new UserService(usersRepository);
    });

    it('should be able to delete user by id', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');

      expect(await userService.delete(user.id || 0));
    });

    it('should not be able to delete user by id not existing', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');

      await expect(userService.delete(-1)).rejects.toEqual(
        new CustomError(404, { message: 'User not found!' })
      );
    });

    it('should not be able to find user data by id invalid', async () => {
      const user = await userService.create(userData);

      expect(user).toHaveProperty('id');

      await expect(userService.delete(0)).rejects.toEqual(
        new CustomError(404, { message: 'User not found!' })
      );
    });
  });
});

