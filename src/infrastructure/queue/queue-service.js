import { usersQueue } from './bull.js';

export const queueService = {
  /**
   * Create a new job in usersQueue
   * @param {job} job Job data
   */
  createJob: async (job) => {
    console.log(`[Bull service]: creating job ${job.action} in ${job.type}`);
    usersQueue.add(job);
    console.log('[Bull service]: job created');
  }
};

/**
 * @typedef job
 *  @property {object} data data required in the job.
 *  @property {string} action Action to procces.
 *  @property {string} type data type
 */
