import { ErrorMessages } from '../exceptions/error-messages.js';
import { ValidationException } from '../exceptions/exceptions.js';
import { idSchema, queryParamsSchema, userArraySchema, userSchema } from '../schemas.js';

/**
 * Class for handling HTTP Requests and Responses for managing users
 * @class
 */
export class UserController {
  /**
   *
   * @param {import('./service.js').UserService} userService  Service that encapsulates the business logic for user operations.
   */
  constructor (userService) {
    /**
     * @type {import('./service.js').UserService}
     */
    this.userService = userService;
  }

  /**
   * Controller that handles HTTP requests and responses for creating a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  crateUser = async (ctx) => {
    const { error, value: user } = userSchema.validate(ctx.request.body);
    if (error) {
      throw new ValidationException(ErrorMessages.REQUIRED_FIELD);
    }
    await this.userService.createUser(user);
    ctx.body = { message: 'User Created', success: true };
    ctx.status = 201;
  };

  /**
   * Controller that handles HTTP requests and responses for updating a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  updateUser = async (ctx) => {
    const { error, value: id } = idSchema.validate(ctx.params.id);
    if (error) {
      throw new ValidationException(ErrorMessages.INVALID_ID);
    }

    const user = ctx.request.body;
    await this.userService.updateUser(id, user);
    ctx.body = { message: 'User Updated', success: true };
    ctx.status = 200;
  };

  /**
   * Controller that handles HTTP requests and responses for getting a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  getUser = async (ctx) => {
    const { error, value: id } = idSchema.validate(ctx.params.id);
    if (error) {
      throw new ValidationException(ErrorMessages.INVALID_ID);
    }
    const user = await this.userService.getUser(id);
    ctx.body = { message: 'User retrieved', success: true, data: user };
    ctx.status = 200;
  };

  /**
   * Controller that handles HTTP requests and responses for getting a list of users.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  getUsers = async (ctx) => {
    const { error, value: query } = queryParamsSchema.validate(ctx.query, { convert: true });
    if (error) {
      console.log(error);
      throw new ValidationException(ErrorMessages.INVALID_VALUE);
    }
    const users = await this.userService.getUsers(query ?? {});
    ctx.body = { message: 'Users retrieved', success: true, data: users };
    ctx.status = 200;
  };

  /**
   * Controller that handles HTTP requests and responses for deleting a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  deleteUser = async (ctx) => {
    const { error, value: id } = idSchema.validate(ctx.params.id);
    if (error) {
      throw new ValidationException(ErrorMessages.INVALID_ID);
    }
    await this.userService.deleteUser(id);
    ctx.status = 204;
  };

  /**
   * Controller that handles HTTP requests and responses for deleting a user.
   * This function:
   * - Validate and extract parameters from the request.
   * - Calling the corresponding service.
   * - Returning the appropriate response to the client.
   * @param {import('koa').Context} ctx The Koa context containing request and response.
   */
  bulkCreate = async (ctx) => {
    const { error, value: users } = userArraySchema.validate(ctx.request.body.users);
    if (error) {
      throw new ValidationException(ErrorMessages.REQUIRED_FIELD);
    }
    console.log('[User Controller]: Creating bulk users');
    this.userService.bulkCreate(users);
    ctx.body = { message: 'User creation queued', success: true };
    ctx.status = 200;
  };
}
