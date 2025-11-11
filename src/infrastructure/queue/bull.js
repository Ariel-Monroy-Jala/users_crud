import Queue from 'bull';

export const usersQueue = new Queue('users_queue', { redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD } });

export const testConnection = async () => {
  usersQueue.client.ping().then((res) => {
    console.log('[Bull queue]: Redis connected', res);
  }).catch((err) => {
    console.error('[Bull queue]: Error connecting with Redis', err);
  });
};
