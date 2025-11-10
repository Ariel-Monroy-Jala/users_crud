import { ApiException } from '../exceptions/ApiException.js';
import { userRepository } from './repository.js';

export const userService = {

  createUser: async (user) => {
    if (!user.name || !user.username || !user.password) {
      throw new ApiException(400, 'Invalid request');
    }

    await userRepository.createUser(user);
  },
  updateUser: async (id, user) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const dbUser = await userRepository.getUser(id);
    if (!dbUser) throw new ApiException(404, 'Not found');
    await userRepository.updateUser(id, user);
  },

  getUser: async (id) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const user = await userRepository.getUser(id);
    if (!user) throw new ApiException(404, 'Not found');
    return user;
  },

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
  deleteUser: async (id) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const dbUser = await userRepository.getUser(id);
    if (!dbUser) throw new ApiException(404, 'Not found');
    await userRepository.deleteUser(id);
  }
};
