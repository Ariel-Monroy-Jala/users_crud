import Koa from 'koa';

const app = new Koa();

const port = process.env.PORT || 3002

app.listen(port, () => { console.log(`Listening on port ${port}`)});