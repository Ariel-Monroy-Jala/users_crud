/* eslint-disable no-unused-expressions */
import { describe, it, before, after } from 'mocha';
import { usersQueue } from '../../src/infrastructure/queue/bull.js';
import '../../src/infrastructure/worker/worker.js';
import { expect } from 'chai';

import Sinon from 'sinon';
import { userService } from '../../src/users/service.js';
import { sequelize } from '../../src/infrastructure/db/sequelize.js';

describe('E2E Bull worker', function () {
  this.timeout(10000);

  before(async () => {
    await sequelize.authenticate();
    Sinon.stub(userService, 'bulkCreate').resolves(true);
  });

  after(() => {
    userService.bulkCreate.restore();
    usersQueue.close();
    sequelize.close();
  });

  it('Should process a job', function (done) {
    const jobData = {
      action: 'create',
      type: 'user',
      data:
        {
          name: 'Jhon Doe',
          username: 'jdoe',
          password: 'superPassword'
        }
    };
    usersQueue.once('completed', (job, result) => {
      expect(result.success).to.be.true;
      done();
    });

    usersQueue.once('failed', (job, err) => {
      done(err);
    });

    usersQueue.add(jobData);
  });
});
