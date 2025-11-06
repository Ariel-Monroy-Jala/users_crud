import Koa from 'koa';
import { initConnection } from './db/sequelize.js';
import { router } from './users/routes.js';
import { bodyParser } from '@koa/bodyparser';


const app = new Koa();

app.use(bodyParser());

await initConnection();


app.use(router.routes()).use(router.allowedMethods());


const port = process.env.PORT || 3002

app.listen(port, () => { console.log(`Listening on port ${port}`) });