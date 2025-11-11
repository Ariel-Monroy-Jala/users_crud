import Koa from 'koa';
import { initConnection } from './infrastructure/db/sequelize.js';
import { router } from './users/routes.js';
import { bodyParser } from '@koa/bodyparser';
import { errorHandler } from './middlewares/error-handler.js';
import './infrastructure/worker/worker.js';
import { testConnection } from './infrastructure/queue/bull.js';

const app = new Koa();

app.use(bodyParser());

app.use(errorHandler);

await initConnection();

await testConnection();

app.use(router.routes()).use(router.allowedMethods());

export default app;
