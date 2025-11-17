/* eslint-disable no-unused-expressions */
import { describe, it, before, after } from 'mocha';
import { createBulkUsersQueue } from '../../src/infrastructure/queue/bull.js';
import '../../src/infrastructure/worker/worker.js';
import { expect } from 'chai';

import Sinon from 'sinon';
import { UserService } from '../../src/users/service.js';
import { sequelize } from '../../src/infrastructure/db/sequelize.js';
import { UserModel } from '../../src/infrastructure/db/models/user.js';

describe('E2E Bull worker', function () {
  this.timeout(10000);
  const userService = new UserService(null);
  before(async () => {
    await sequelize.authenticate();
    Sinon.stub(userService, 'bulkCreate').resolves(true);
  });

  after(async () => {
    userService.bulkCreate.restore();
    await UserModel.destroy({ where: { name: 'Jhon Doe' } });
    createBulkUsersQueue.close();
    sequelize.close();
  });

  it('Should process a job', function (done) {
    const jobData = {

      users: [{
        name: 'Jhon Doe',
        username: 'jdoe',
        password: 'superPassword'
      }]

    };
    createBulkUsersQueue.once('completed', (job, result) => {
      expect(result.success).to.be.true;
      done();
    });

    createBulkUsersQueue.once('failed', (job, err) => {
      done(err);
    });

    createBulkUsersQueue.add(jobData);
  });
});
