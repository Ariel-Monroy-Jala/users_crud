import { createBulkUsersQueue } from '../queue/bull.js';
import { userRepository } from '../../users/repository.js';

createBulkUsersQueue.process(2, async (job) => {
  const { users } = job.data;
  console.log(`[Bull worker]: Starting process job ${job.id} to creating users`);
  await sleep(10000);
  await userRepository.bulkCreate(users);
  return { success: true };
});

createBulkUsersQueue.on('completed', (job, result) => {
  console.log(`[Bull worker]: Job ${job.id} completed ${JSON.stringify(result)}`);
});

createBulkUsersQueue.on('failed', (job, err) => {
  console.error(`[Bull worker]: Job ${job.id} failed`, err);
});

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
