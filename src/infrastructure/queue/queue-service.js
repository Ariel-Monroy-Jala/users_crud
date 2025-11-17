export class QueueService {
  constructor (queue) {
    this.queue = queue;
    this.testConnection();
  }

  testConnection () {
    this.queue.client.ping().then((res) => {
      console.log('[Bull queue]: Redis connected', res);
    }).catch((err) => {
      console.error('[Bull queue]: Error connecting with Redis', err);
    });
  }

  /**
   * Create a new job in usersQueue
   * @param {job} job Job data
   */
  async createBulkUserCreationJob (job) {
    console.log('[Bull service]: creating job for bulk user creation');
    this.queue.add(job);
    console.log('[Bull service]: job created');
  }
}

/**
 * @typedef job
 *  @property {object} data data required in the job.
 *  @property {string} action Action to procces.
 *  @property {string} type data type
 */
