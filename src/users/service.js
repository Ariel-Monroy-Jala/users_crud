import { ApiException } from '../exceptions/ApiException.js';
import { userRepository } from './repository.js';

export const userService = {

  /**
   * Service for creating a user it  contains business logic.
   * This function:
   * - Executes business rules.
   * - Validates and transforms data.
   * - Calls the repository to access data.
   * @param {import('../types.js').CreateUserDto} user data from request.
   * @returns {Promise<void>} Returns a promise.
   */
  createUser: async (user) => {
    if (!user.name || !user.username || !user.password) {
      throw new ApiException(400, 'Invalid request');
    }

    await userRepository.createUser(user);
  },

  /**
   * Service for updating a user it  contains business logic.
   * This function:
   * - Executes business rules.
   * - Validates and transforms data.
   * - Calls the repository to access data.
   * @param {string} id UUID coming from the request path.
   * @param {import('../types.js').UpdateUserDto} user Data from request body.
   * @returns {Promise<void>} Returns a promise.
   */
  updateUser: async (id, user) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const dbUser = await userRepository.getUser(id);
    if (!dbUser) throw new ApiException(404, 'Not found');
    await userRepository.updateUser(id, user);
  },

  /**
   * Service for getting a user by its id, it  contains business logic.
   * This function:
   * - Executes business rules.
   * - Validates and transforms data.
   * - Calls the repository to access data.
   * @param {string} id UUID coming from the request path.
   * @returns {Promise<import('../types.js').User>} UserModel wrapped in a promise.
   */
  getUser: async (id) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const user = await userRepository.getUser(id);
    if (!user) throw new ApiException(404, 'Not found');
    return user;
  },

  /**
   * Service for getting a user by its id, it  contains business logic.
   * This function:
   * - Executes business rules.
   * - Validates and transforms data.
   * - Calls the repository to access data.
   * @param {number} [page] Number of the page to retrieve (optional).
   * @param {number} [size] Number entries to retrieve in each page (optional).
   * @param {string} [filter] String to filter database entries (optional).
   * @returns {Promise<import('../types.js').UserList>} List of users wrapped in a promise.
   */
  getUsers: async (page, size, filter) => {
    if (!page) page = 1;
    if (!size) size = 10;
    if (!filter) {
      filter = '%%';
    } else {
      filter = `%${filter}%`;
    }
    const users = await userRepository.getUsers(parseInt(page), parseInt(size), filter);
    return { elements: users.rows, totalElements: users.count, page, size, totalPages: Math.ceil(users.count / size) };
  },

  /**
   * Service for deleting a user by its id, it  contains business logic.
   * This function:
   * - Executes business rules.
   * - Validates and transforms data.
   * - Calls the repository to access data.
   * @param {string} id UUID coming from the request path.
   * @returns {Promise<void>} promise
   */
  deleteUser: async (id) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const dbUser = await userRepository.getUser(id);
    if (!dbUser) throw new ApiException(404, 'Not found');
    await userRepository.deleteUser(id);
  }
};
