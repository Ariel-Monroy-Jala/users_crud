import Queue from 'bull';

export const createBulkUsersQueue = new Queue('create_bulk_users_queue', { redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD } });

export const testConnection = async () => {
  createBulkUsersQueue.client.ping().then((res) => {
    console.log('[Bull queue]: Redis connected', res);
  }).catch((err) => {
    console.error('[Bull queue]: Error connecting with Redis', err);
  });
};
