export const cleanResponse =  async (ctx, next) => {
  await next();

  if (!ctx.body || !ctx.body.data) return
  if (ctx.body.data.elements) {
    const users = ctx.body.data.elements;
    ctx.body.data.elements = users.map((user) => {
      return { id: user.id, name: user.name, username: user.username };
    });
  } else {
    const user = ctx.body.data;
    ctx.body.data = { id: user.id, name: user.name, username: user.username };
  }
  

}