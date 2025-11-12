import { usersQueue } from '../queue/bull.js';
import { userService } from '../../users/service.js';

const actions = {
  'create:user': userService.bulkCreate
};

usersQueue.process(async (job) => {
  const { action, type, data } = job.data;
  console.log(`[Bull worker]: Starting process job ${job.id} task ${action} in type ${type}`);
  const actionFunc = actions[`${action}:${type}`];
  await actionFunc(data);
  return { success: true, count: data.length };
});

usersQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed ${result}`);
});

usersQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed`, err);
});
