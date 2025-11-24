import { Op } from 'sequelize';

/**
 * Class for managing comunication with the database.
 * @class
 */
export class UserRepository {
  /**
   *
   * @param {import('sequelize').ModelStatic<import('../types.js').User>} userModel Sequelize model representing the User entity.
   */
  constructor (userModel) {
    /**
     * @type {import('sequelize').ModelStatic<import('../types.js').User>}
     */
    this.userModel = userModel;
  }

  /**
   * Repository that manages creation of a user.
   *
   * This function:
   * - Performs create operation in the database.
   * @param {import('../types.js').CreateUserDto} user User data for database storage.
   * @returns {Promise<void>} nothing.
   */
  async createUser (user) {
    await this.userModel.create(user);
  }

  /**
   * Repository that manages updating a user.
   * This function:
   * - Performs update operation in the database.
   * @param {string} id UUID of the user to update.
   * @param {import('../types.js').UpdateUserDto} user New user data for database storage.
   * @returns {Promise<void>} Promise.
   */
  async updateUser (id, user) {
    await this.userModel.update(user, { where: { id } });
  }

  /**
   * Repository that manages retrieving a user by its id.
   *
   * This function:
   * - Obtains data in the format expected by the service.
   * @param {string} id UUID of the user to update.
   * @returns {Promise<import('../types.js').User>} User data wrapped in a promise.
   */
  async getUser (id) {
    const user = await this.userModel.findOne({ where: { id } });
    return user;
  }

  /**
   * Repository that manages getting a list of users and count.
   *
   * This function:
   * - Obtains data in the format expected by the service.
   * @param {number} page Number of the page to retrieve.
   * @param {number} size Number entries to retrieve in each page.
   * @param {string} filter String to filter database entries.
   * @returns {Promise<UserCount>} User data wrapped in a promise.
   */
  async getUsers (page, size, filter) {
    return await this.userModel.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: filter } },
          { username: { [Op.like]: filter } }
        ]
      },
      limit: size,
      offset: (page - 1) * size
    });
  }

  /**
   * Repository that manages deleting a user.
   *
   * This function:
   * - Performs delete operation in the database.
   * @param {string} id UUID of the user to delete.
   * @returns {Promise<void>} Promise.
   */
  async deleteUser (id) {
    await this.userModel.destroy({ where: { id } });
  }

  /**
   * Repository that manages creating a list of users.
   *
   * This function:
   * - Performs bulk create operation in the database.
   * @param {import('../types.js').User} users List of users to be created
   */
  async bulkCreate (users) {
    await this.userModel.bulkCreate(users);
  }
}

/**
 * @typedef UserCount
 * @property {import('../types.js').User[]} rows User list from findAll.
 * @property {number} count Number of entries found.
 */
