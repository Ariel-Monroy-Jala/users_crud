/* eslint-disable no-unused-expressions */
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import { UserModel } from '../../src/infrastructure/db/models/user.js';
import { userRepository } from '../../src/users/repository.js';

const fakeUser = {
  id: '1234-5678',
  name: 'Jhon Doe',
  username: 'jdoe',
  password: 'superPassword'
};

const fakeId = '1234-5678';

describe('User repository', () => {
  let createStub;
  let updateStub;
  let findOneStub;
  let findAllStub;
  let destroyStub;
  let createBatchStub;

  beforeEach(() => {
    createStub = sinon.stub(UserModel, 'create');
    updateStub = sinon.stub(UserModel, 'update');
    findOneStub = sinon.stub(UserModel, 'findOne');
    findAllStub = sinon.stub(UserModel, 'findAndCountAll');
    destroyStub = sinon.stub(UserModel, 'destroy');
    createBatchStub = sinon.stub(UserModel, 'bulkCreate');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Should create a user', async () => {
    createStub.resolves(fakeUser);
    await userRepository.createUser(fakeUser);
    expect(createStub.calledOnceWithExactly(fakeUser)).to.be.true;
  });

  it('Should update a user', async () => {
    updateStub.resolves(fakeUser);
    await userRepository.updateUser(fakeId, fakeUser);
    expect(updateStub.calledOnceWithExactly(fakeUser, { where: { id: fakeId } })).to.be.true;
  });

  it('Should get user by Id', async () => {
    findOneStub.resolves(fakeUser);
    const result = await userRepository.getUser(fakeId);
    expect(result.id).to.be.equal(fakeId);
  });

  it('Should get list of users ', async () => {
    findAllStub.resolves({ rows: [fakeUser], count: 1 });
    const result = await userRepository.getUsers(1, 10, '');
    expect(Array.isArray(result.rows)).to.be.true;
    expect(result.count).to.be.equal(1);
  });

  it('Should delete one user', async () => {
    destroyStub.resolves(1);
    await userRepository.deleteUser(fakeId);
    expect(destroyStub.calledOnceWithExactly({ where: { id: fakeId } })).to.be.true;
  });

  it('Should create users in batch', async () => {
    createBatchStub.resolves([fakeUser]);
    await userRepository.bulkCreate([fakeUser]);
    expect(createBatchStub.calledOnceWithExactly([fakeUser])).to.be.true;
  });
});
