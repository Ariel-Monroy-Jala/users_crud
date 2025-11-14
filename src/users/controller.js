import { ErrorMessages } from '../exceptions/error-messages.js';
import { ValidationException } from '../exceptions/exceptions.js';
import { userService } from './service.js';
import { idSchema, queryParamsSchema, userArraySchema, userSchema } from '../schemas.js';
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
    const { error, value: user } = userSchema.validate(ctx.request.body);
    if (error) {
      throw new ValidationException(ErrorMessages.REQUIRED_FIELD);
    }
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
    const { error, value: id } = idSchema.validate(ctx.params.id);
    if (error) {
      throw new ValidationException(ErrorMessages.INVALID_ID);
    }

    const user = ctx.request.body;
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
    const { error, value: id } = idSchema.validate(ctx.params.id);
    if (error) {
      throw new ValidationException(ErrorMessages.INVALID_ID);
    }
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
    const { error, value: query } = queryParamsSchema.validate(ctx.query, { convert: true });
    if (error) {
      console.log(error);
      throw new ValidationException(ErrorMessages.INVALID_VALUE);
    }
    const users = await userService.getUsers(query ?? {});
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
    const { error, value: id } = idSchema.validate(ctx.params.id);
    if (error) {
      throw new ValidationException(ErrorMessages.INVALID_ID);
    }
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
  bulkCreate: async (ctx) => {
    const { error, value: users } = userArraySchema.validate(ctx.request.body.users);
    if (error) {
      throw new ValidationException(ErrorMessages.REQUIRED_FIELD);
    }
    console.log('[User Controller]: Creating bulk users');
    userService.bulkCreate(users);
    ctx.body = { message: 'User creation queued', success: true };
    ctx.status = 200;
  }
};
