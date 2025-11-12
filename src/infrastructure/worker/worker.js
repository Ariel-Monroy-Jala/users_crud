import { usersQueue } from '../queue/bull.js';
import { userService } from '../../users/service.js';

const actions = {
  'create:user': userService.bulkCreate
};

usersQueue.process(2, async (job) => {
  const { action, type, data } = job.data;
  console.log(`[Bull worker]: Starting process job ${job.id} task ${action} in type ${type}`);
  await sleep(2000);
  const actionFunc = actions[`${action}:${type}`];
  await actionFunc(data);
  return { count: data.length, success: true };
});

usersQueue.on('completed', (job, result) => {
  console.log(`[Bull worker]: Job ${job.id} completed ${JSON.stringify(result)}`);
});

usersQueue.on('failed', (job, err) => {
  console.error(`[Bull worker]: Job ${job.id} failed`, err);
});

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
