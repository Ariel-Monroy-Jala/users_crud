import { UserModel } from '../db/models/user.js';
import { Op } from 'sequelize';

export const userRepository = {

  /**
   * Repository that manages creation of a user.
   *
   * This function:
   * - Performs create operation in the database.
   *
   * @param {import('../types.js').CreateUserDto} user User data for database storage.
   * @returns {Promise<void>} Promise.
   */
  createUser: async (user) => {
    await UserModel.create(user);
  },

  /**
   * Repository that manages updating a user.
   *
   * This function:
   * - Performs update operation in the database.
   *
   * @param {string} id UUID of the user to update.
   * @param {import('../types.js').UpdateUserDto} user New user data for database storage.
   * @returns {Promise<void>} Promise.
   */
  updateUser: async (id, user) => {
    await UserModel.update(user, { where: { id } });
  },

  /**
   * Repository that manages retrieving a user by its id.
   *
   * This function:
   *  - Obtains data in the format expected by the service.
   *
   * @param {string} id UUID of the user to update.
   * @returns {Promise<import('../types.js').User>} User data wrapped in a promise.
   * @returns {Promise<null>} null value wrapped in a promise if user doesn't exists in database.
   */
  getUser: async (id) => {
    const user = await UserModel.findOne({ where: { id } });
    return user;
  },

  /**
   * Repository that manages getting a list of users and count.
   *
   * This function:
   *  - Obtains data in the format expected by the service.
   *
   * @param {number} page Number of the page to retrieve.
   * @param {number} size Number entries to retrieve in each page.
   * @param {string} filter String to filter database entries.
   * @returns {Promise<UserCount>} User data wrapped in a promise.
   */
  getUsers: async (page, size, filter) => {
    return await UserModel.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: filter } },
          { username: { [Op.like]: filter } }
        ]
      },
      limit: size,
      offset: (page - 1) * size
    });
  },

  /**
   * Repository that manages deleting a user.
   *
   * This function:
   *  - Performs delete operation in the database.
   *
   * @param {string} id UUID of the user to delete.
   * @returns {Promise<void>} Promise.
   */
  deleteUser: async (id) => {
    await UserModel.destroy({ where: { id } });
  }
};

/** @typedef UserCount
 * @property {User[]} rows User list from findAll.
 * @property {number} count Number of entries found.
 */
