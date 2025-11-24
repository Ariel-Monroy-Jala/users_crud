/**
 *
 * @param {import('koa').Context} ctx The Koa context containing request and response.
 * @param {import('koa').Next} next The Koa next function.
 * @returns {void}
 */
export const cleanResponse = async (ctx, next) => {
  await next();

  if (!ctx.body || !ctx.body.data) return;
  if (ctx.body.data.elements) {
    const users = ctx.body.data.elements;
    ctx.body.data.elements = users.map((user) => {
      return { id: user.id, name: user.name, username: user.username };
    });
  } else {
    const user = ctx.body.data;
    ctx.body.data = { id: user.id, name: user.name, username: user.username };
  }
};
