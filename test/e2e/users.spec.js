import { describe, it, after, before } from 'mocha';
import app from '../../src/app.js';
import request from 'supertest';
import { expect } from 'chai';
import { sequelize } from '../../src/infrastructure/db/sequelize.js';
import Sinon from 'sinon';
import { usersQueue } from '../../src/infrastructure/queue/bull.js';

const userBodyRequest = {
  name: 'Jhon Doe',
  username: 'jdoe',
  password: 'password'
};

const fakeId = '97eefd0a-e1d5-49e0-993d-03676f2910f4';

describe(('E2E: User API'), () => {
  let server;
  let userId;

  before(() => {
    server = request(app.callback());
    Sinon.stub(console, 'error');
  });

  after(async () => {
    await sequelize.close();
    console.log('[DB] Connection Close');
    await usersQueue.close();
    console.log('[Bull queue] Connection Close');
  });

  describe('POST /users', () => {
    it('Should return 201', async () => {
      const response = await server.post('/users').send(userBodyRequest);
      expect(response.status).to.be.equal(201);
    });

    it('Should return 400', async () => {
      const response = await server.post('/users').send({ ...userBodyRequest, name: null });
      expect(response.status).to.be.equal(400);
    });
  });

  describe('GET /users', () => {
    it('Should return list of users', async () => {
      const response = await server.get('/users');
      expect(response.status).to.be.equal(200);
      // eslint-disable-next-line no-unused-expressions
      expect(Array.isArray(response.body.data.elements)).to.be.true;
      expect(response.body.data.page).to.be.equal(1);
      expect(response.body.data.size).to.be.equal(10);
    });

    it('Should filter users', async () => {
      const response = await server.get('/users').query({ filter: 'Jhon Doe' });
      // eslint-disable-next-line no-unused-expressions
      expect(Array.isArray(response.body.data.elements)).to.be.true;
      userId = response.body.data.elements[0].id;
      expect(response.body.data.elements.length).to.be.equal(1);
    });

    it('Should filter users with name diferent from Jhon doe"', async () => {
      const response = await server.get('/users').query({ filter: 'Not Jhon Doe' });
      // eslint-disable-next-line no-unused-expressions
      expect(Array.isArray(response.body.data.elements)).to.be.true;
      expect(response.body.data.elements.length).to.be.equal(0);
    });
  });

  describe('GET /users/:id', () => {
    it('Should get user by its id', async () => {
      const response = await server.get(`/users/${userId}`);
      expect(response.body.data.name).to.be.equal(userBodyRequest.name);
      expect(response.body.data.username).to.be.equal(userBodyRequest.username);
    });

    it('Should throw 400 error', async () => {
      const response = await server.get('/users/someFakeId');
      expect(response.status).to.be.equal(400);
      expect(response.body.success).to.be.equal(false);
    });

    it('Should throw 404 error', async () => {
      const response = await server.get(`/users/${fakeId}`);
      expect(response.status).to.be.equal(404);
      expect(response.body.success).to.be.equal(false);
    });
  });

  describe('PUT /users/:id', () => {
    it('Should update a user', async () => {
      const putResponse = await server.put(`/users/${userId}`).send({ ...userBodyRequest, username: 'doej' });
      expect(putResponse.status).to.be.equal(200);
      expect(putResponse.body.success).to.be.equal(true);
      const getResponse = await server.get(`/users/${userId}`);
      expect(getResponse.body.data.username).to.be.equal('doej');
    });

    it('Should throw 405 error', async () => {
      const putResponse = await server.put('/users/').send({ ...userBodyRequest, username: 'doej' });
      expect(putResponse.status).to.be.equal(405);
    });

    it('Should throw 400 error', async () => {
      const putResponse = await server.put('/users/someFakeId').send({ ...userBodyRequest, username: 'doej' });
      expect(putResponse.status).to.be.equal(400);
      expect(putResponse.body.success).to.be.equal(false);
    });

    it('Should throw 404 error', async () => {
      const putResponse = await server.put(`/users/${fakeId}`).send({ ...userBodyRequest, username: 'doej' });
      expect(putResponse.status).to.be.equal(404);
      expect(putResponse.body.success).to.be.equal(false);
    });
  });

  describe('DELETE /users/:id', () => {
    it('Should delete a user', async () => {
      const deleteResponse = await server.delete(`/users/${userId}`);
      expect(deleteResponse.status).to.be.equal(204);
      const getResponse = await server.get(`/users/${userId}`);
      expect(getResponse.status).to.be.equal(404);
      expect(getResponse.body.success).to.be.equal(false);
    });

    it('Should throw 405 error', async () => {
      const response = await server.delete('/users/');
      expect(response.status).to.be.equal(405);
    });

    it('Should throw 400 error', async () => {
      const response = await server.delete('/users/someFakeId');
      expect(response.status).to.be.equal(400);
      expect(response.body.success).to.be.equal(false);
    });

    it('Should throw 404 error', async () => {
      const response = await server.delete(`/users/${fakeId}`);
      expect(response.status).to.be.equal(404);
      expect(response.body.success).to.be.equal(false);
    });
  });
});
