export const cleanResponse =  async (ctx, next) => {
  await next();
  const users = ctx.body.data.rows;
  ctx.body.data.rows = users.map((user) => {
    return { id: user.id, name: user.name, username: user.username };
  });

}