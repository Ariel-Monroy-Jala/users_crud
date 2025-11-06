import { userService } from "./service.js"

export const userController = {

  crateUser: async (ctx) => {
    try {
      const user = ctx.request.body;
      console.log(user);
      await userService.createUser(user);
      ctx.body = JSON.stringify({ message: "User Created", success: true })
      ctx.status = 201;
    } catch (error) {
      if (error.message === "Invalid request") {
        ctx.throw(400, { message: error.message, success: false });
      }
      ctx.throw(500, error.message);
    }
  },

  updateUser: async (ctx) => {
    try {
      const user = ctx.request.body;
      const id = ctx.params.id;
      await userService.updateUser(id, user);
      ctx.body = JSON.stringify({ message: "User Updated", success: true })
      ctx.status = 200;
    } catch (error) {
      if (error.message === "Invalid request") {
        ctx.throw(400, { message: error.message, success: false });
      }
      ctx.throw(500, error.message);
    }
  },

  getUser: async (ctx) => {
    try {
      const id = ctx.params.id;
      const user = await userService.getUser(id);
      ctx.body = { message: "User retrieved", success: true, data: user };
      ctx.status = 200;
    } catch (error) {
      if (error.message === "Invalid request") {
        ctx.throw(400, { message: error.message, success: false });
      }
      ctx.throw(500, error.message);
    }
  },

  getUsers: async (ctx) => {
    try {
      const { page, size, filter } = ctx.query;
      const users = await userService.getUsers(page, size, filter);
      ctx.body = { message: "Users retrieved", success: true, data: users }
      ctx.status = 200;
    } catch (error) {
      if (error.message === "Invalid request") {
        ctx.throw(400, { message: error.message, success: false });
      }
      ctx.throw(500, error.message);
    }
  }
  ,
  deleteUser: async (ctx) => {
    try {
      const id = ctx.params.id;
      await userService.deleteUser(id);
      ctx.status = 204;
    } catch (error) {
      if (error.message === "Invalid request") {
        ctx.throw(400, { message: error.message, success: false });
      }
      ctx.throw(500, error.message);
    }
  }
}
