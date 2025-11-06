import Koa from 'koa';
import { initConnection } from './db/sequelize.js';
import { router } from './users/routes.js';
import { bodyParser } from '@koa/bodyparser';
import { errorHandler } from './middlewares/error-handler.js';


const app = new Koa();

app.use(bodyParser());

app.use(errorHandler);

await initConnection();


app.use(router.routes()).use(router.allowedMethods());


const port = process.env.PORT || 3002

app.listen(port, () => { console.log(`Listening on port ${port}`) });