export const cleanResponse =  async (ctx, next) => {
  await next();

  if (!ctx.body || !ctx.body.data) return
  if (ctx.body.data.rows) {
    const users = ctx.body.data.rows;
    ctx.body.data.rows = users.map((user) => {
      return { id: user.id, name: user.name, username: user.username };
    });
  } else {
    const user = ctx.body.data;
    ctx.body.data = { id: user.id, name: user.name, username: user.username };
  }
  

}