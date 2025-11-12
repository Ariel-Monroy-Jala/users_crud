import { describe, beforeEach, afterEach, it } from 'mocha';
import Sinon from 'sinon';
import { userRepository } from '../../src/users/repository.js';
import { userService } from '../../src/users/service.js';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { NotFoundException } from '../../src/exceptions/exceptions.js';
import { ErrorMessages } from '../../src/exceptions/error-messages.js';

chai.use(chaiAsPromised);
const expect = chai.expect;

const fakeUser = {
  id: '1234-5678',
  name: 'Jhon Doe',
  username: 'jdoe',
  password: 'superPassword'
};

const fakeId = '1234-5678';

describe('User service', () => {
  let createStub;
  let updateStub;
  let getStub;
  let getUsersStub;
  let deleteStub;

  beforeEach(() => {
    createStub = Sinon.stub(userRepository, 'createUser');
    updateStub = Sinon.stub(userRepository, 'updateUser');
    getStub = Sinon.stub(userRepository, 'getUser');
    getUsersStub = Sinon.stub(userRepository, 'getUsers');
    deleteStub = Sinon.stub(userRepository, 'deleteUser');
  });

  afterEach(() => {
    Sinon.restore();
  });

  describe('Creating a user', () => {
    it('Should create user', async () => {
      createStub.resolves(fakeUser);
      await userService.createUser(fakeUser);
      expect(createStub.calledOnceWithExactly(fakeUser));
    });
  });

  describe('Updating a user', () => {
    it('Should update user', async () => {
      updateStub.resolves(fakeUser);
      getStub.resolves(fakeUser);
      await userService.updateUser(fakeId, fakeUser);
      expect(updateStub.calledOnceWithExactly(fakeId, fakeUser));
    });

    it('Should throw Not found error', async () => {
      updateStub.resolves(null);
      getStub.resolves(null);
      await expect(userService.updateUser(fakeId, fakeUser)).to.be.rejectedWith(NotFoundException, ErrorMessages.USER_NOT_FOUND);
    });
  });

  describe('Getting a user', () => {
    it('Should get user', async () => {
      getStub.resolves(fakeUser);
      const result = await userService.getUser(fakeId);
      expect(result).to.be.equals(fakeUser);
    });

    it('Should throw Not found error', async () => {
      getStub.resolves(null);
      await expect(userService.getUser(fakeId)).to.be.rejectedWith(NotFoundException, ErrorMessages.USER_NOT_FOUND);
    });
  });

  describe('Getting users', () => {
    it('Should get list user with one user', async () => {
      getUsersStub.resolves({ rows: [fakeUser], count: 1 });
      const result = await userService.getUsers(1, 1, '');
      expect(result.elements.length).to.be.equal(1);
      expect(result.totalElements).to.be.equal(1);
    });

    it('Should get list users with multiple pages', async () => {
      getUsersStub.resolves({ rows: [fakeUser, fakeUser, fakeUser], count: 10 });
      const query = { page: 1, size: 3, filter: '' };
      const result = await userService.getUsers(query);
      expect(result.elements.length).to.be.equal(3);
      expect(result.totalElements).to.be.equal(10);
      expect(result.totalPages).to.be.equal(4);
    });

    it('Should get list users with no data', async () => {
      getUsersStub.resolves({ rows: [], count: 0 });
      const result = await userService.getUsers(1, 10, '');
      expect(result.elements.length).to.be.equal(0);
      expect(result.totalElements).to.be.equal(0);
      expect(result.totalPages).to.be.equal(0);
    });
  });

  describe('Deleting User', () => {
    it('Should delete a user', async () => {
      deleteStub.resolves(1);
      getStub.resolves(fakeUser);
      await userService.deleteUser(fakeId);
      expect(deleteStub.calledOnceWithExactly(fakeId));
    });

    it('Should throw Not found error', async () => {
      getStub.resolves(null);
      await expect(userService.deleteUser(fakeId)).to.be.rejectedWith(NotFoundException, ErrorMessages.USER_NOT_FOUND);
    });
  });
});
