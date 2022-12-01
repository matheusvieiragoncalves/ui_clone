/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest';
import App from '../../../app';
import { prisma } from '../../../database/client';

describe('UserController', () => {
  beforeAll(async () => {
    await prisma.client.deleteMany({});
    await prisma.user.deleteMany({});
  });

  describe('Create', () => {
    beforeAll(async () => {
      await prisma.user.deleteMany({});
    });

    it('Should be able to create a new user', async () => {
      const response = await request(App).post('/users').send({
        email: 'user@email.com',
        password: '123456',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });

    it('Should not be able to create a new user with invalid fields', async () => {
      const response = await request(App).post('/users').send({
        email: 'user@email.com',
        passwor: '123456',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('Create With Client', () => {
    beforeAll(async () => {
      await prisma.client.deleteMany({});
      await prisma.user.deleteMany({});
    });

    afterAll(async () => {
      await prisma.client.deleteMany({});
      await prisma.user.deleteMany({});
    });

    it('Should be able to create a new user with client', async () => {
      const { status, body } = await request(App).post('/user-clients').send({
        email: 'user@email.com',
        password: '123456',
        name: 'Matheus',
      });

      expect(status).toBe(200);
      expect(body).toHaveProperty('id');
    });

    it('Should not be able to create a new user with invalid fields', async () => {
      const response = await request(App).post('/user-clients').send({
        email: 'user@email.com',
        password: '123456',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('Find All', () => {
    beforeAll(async () => {
      await prisma.user.deleteMany({});
    });

    it('Should be able to create two users and find all user', async () => {
      const { status: statusUserOne } = await request(App).post('/users').send({
        email: 'user@email.com',
        password: '123456',
      });

      expect(statusUserOne).toBe(200);

      const { status: statusUserTwo } = await request(App).post('/users').send({
        email: 'user2@email.com',
        password: '123456',
      });

      expect(statusUserTwo).toBe(200);

      const { status: loginStatus, body: loginBody } = await request(App)
        .post('/sessions')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(loginStatus).toBe(200);
      expect(loginBody).toHaveProperty('token');

      const { status } = await request(App)
        .get('/users')
        .auth(loginBody.token, { type: 'bearer' });

      expect(status).toBe(200);
    });
  });

  describe('Find by id', () => {
    beforeAll(async () => {
      await prisma.user.deleteMany({});
    });

    it('Should be able to create a new user and find your data by id', async () => {
      const { status: statusCreateUser, body } = await request(App)
        .post('/users')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(statusCreateUser).toBe(200);

      const { status: loginStatus, body: loginBody } = await request(App)
        .post('/sessions')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(loginStatus).toBe(200);
      expect(loginBody).toHaveProperty('token');

      const { status } = await request(App)
        .get(`/users/${body.id}`)
        .auth(loginBody.token, { type: 'bearer' });

      expect(status).toBe(200);
    });
  });

  describe('Delete by id', () => {
    beforeAll(async () => {
      await prisma.user.deleteMany({});
    });

    it('Should be able to create a new user and find your data by id', async () => {
      const { status: statusCreateUser, body } = await request(App)
        .post('/users')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(statusCreateUser).toBe(200);

      const { status: loginStatus, body: loginBody } = await request(App)
        .post('/sessions')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(loginStatus).toBe(200);
      expect(loginBody).toHaveProperty('token');

      const { status } = await request(App)
        .delete(`/users/${body.id}`)
        .auth(loginBody.token, { type: 'bearer' });

      expect(status).toBe(200);
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      await prisma.user.deleteMany({});
    });

    it('Should be able to create a new user and update your data', async () => {
      const { status: statusCreateUser, body } = await request(App)
        .post('/users')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(statusCreateUser).toBe(200);

      const { status: loginStatus, body: loginBody } = await request(App)
        .post('/sessions')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(loginStatus).toBe(200);
      expect(loginBody).toHaveProperty('token');

      const { status: statusUpdateUser } = await request(App)
        .put('/users')
        .auth(loginBody.token, { type: 'bearer' })
        .send({
          id: body.id,
          email: 'userChanged@email.com',
          password: '123456',
          oldPassword: '123456',
        });

      expect(statusUpdateUser).toBe(200);
    });

    it('Should not be able to create a new user and update your data with fields incorrects', async () => {
      const { status: statusCreateUser, body } = await request(App)
        .post('/users')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(statusCreateUser).toBe(200);

      const { status: loginStatus, body: loginBody } = await request(App)
        .post('/sessions')
        .send({
          email: 'user@email.com',
          password: '123456',
        });

      expect(loginStatus).toBe(200);
      expect(loginBody).toHaveProperty('token');

      const { status: statusUpdateUser } = await request(App)
        .put('/users')
        .auth(loginBody.token, { type: 'bearer' })
        .send({
          id: body.id,
          emai: 'userChanged@email.com',
          passwor: '123456',
          oldPassword: '123456',
        });

      expect(statusUpdateUser).toBe(400);
    });
  });
});
