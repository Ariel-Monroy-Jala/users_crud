import { bullService } from '../infrastructure/queue/bull.service.js';
import { userService } from './service.js';
export const userController = {

  /**
   * Controller that handles HTTP requests and responses for creating a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  crateUser: async (ctx) => {
    const user = ctx.request.body;
    await userService.createUser(user);
    ctx.body = { message: 'User Created', success: true };
    ctx.status = 201;
  },

  /**
   * Controller that handles HTTP requests and responses for updating a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  updateUser: async (ctx) => {
    const user = ctx.request.body;
    const id = ctx.params.id;
    await userService.updateUser(id, user);
    ctx.body = { message: 'User Updated', success: true };
    ctx.status = 200;
  },

  /**
   * Controller that handles HTTP requests and responses for getting a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  getUser: async (ctx) => {
    const id = ctx.params.id;
    const user = await userService.getUser(id);
    ctx.body = { message: 'User retrieved', success: true, data: user };
    ctx.status = 200;
  },

  /**
   * Controller that handles HTTP requests and responses for getting a list of users.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  getUsers: async (ctx) => {
    const { page, size, filter } = ctx.query;
    const users = await userService.getUsers(page, size, filter);
    ctx.body = { message: 'Users retrieved', success: true, data: users };
    ctx.status = 200;
  },

  /**
   * Controller that handles HTTP requests and responses for deleting a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  deleteUser: async (ctx) => {
    const id = ctx.params.id;
    await userService.deleteUser(id);
    ctx.status = 204;
  },

  /**
   * Controller that handles HTTP requests and responses for deleting a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  queueCreate: async (ctx) => {
    const users = ctx.request.body.users;
    console.log('[User Controller]: Creating bulk users');
    bullService.createJob({ data: users, action: 'create', type: 'user' });
    ctx.body = { message: 'User creation queued', success: true };
    ctx.status = 200;
  }
};
