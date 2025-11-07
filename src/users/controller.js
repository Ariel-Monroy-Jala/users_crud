import { userService } from "./service.js"

export const userController = {

  crateUser: async (ctx) => {

    const user = ctx.request.body;
    await userService.createUser(user);
    ctx.body = { message: "User Created", success: true };
    ctx.status = 201;

  },

  updateUser: async (ctx) => {
    const user = ctx.request.body;
    const id = ctx.params.id;
    await userService.updateUser(id, user);
    ctx.body = { message: "User Updated", success: true };
    ctx.status = 200;
  },

  getUser: async (ctx) => {
    const id = ctx.params.id;
    const user = await userService.getUser(id);
    ctx.body = { message: "User retrieved", success: true, data: user };
    ctx.status = 200;
  },

  getUsers: async (ctx) => {

    const { page, size, filter } = ctx.query;
    const users = await userService.getUsers(page, size, filter);
    ctx.body = { message: "Users retrieved", success: true, data: users }
    ctx.status = 200;

  }
  ,
  deleteUser: async (ctx) => {

    const id = ctx.params.id;
    await userService.deleteUser(id);
    ctx.status = 204;

  }
}
