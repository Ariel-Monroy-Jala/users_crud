import Queue from 'bull';

export const createBulkUsersQueue = new Queue('create_bulk_users_queue', { redis: { port: process.env.REDIS_PORT, host: process.env.REDIS_HOST, password: process.env.REDIS_PASSWORD } });
