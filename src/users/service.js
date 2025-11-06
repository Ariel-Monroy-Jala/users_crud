import { ApiException } from "../exceptions/ApiException.js";
import { userRepository } from "./repository.js"

export const userService = {

  createUser: async (user) => {
    if (!user.name || !user.username || !user.password) {
      throw new Error('Invalid request');
    }

    await userRepository.createUser(user);
  }
  ,
  updateUser: async (id, user) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const dbUser = userRepository.getUser(id);
    if (!dbUser) throw new ApiException(404,'Not found');
    await userRepository.updateUser(id, user);
  },

  getUser: async (id) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const user = await userRepository.getUser(id);
    if (!user) throw new ApiException(404,'Not found');
    return user;
  },

  getUsers: async (page, size, filter) => {
    if (!page) page = 1;
    if (!size) size = 10;
    if (!filter ) {
      filter = '%%';
    } else {
      filter = `%${filter}%`;
    }
    
    return userRepository.getUsers(parseInt(page), parseInt(size), filter);
  }
  ,
  deleteUser: async (id) => {
    if (!id) throw new ApiException(400, 'Invalid request');
    const dbUser = userRepository.getUser(id);
    if (!dbUser) throw new ApiException(404,'Not found');
    await userRepository.deleteUser(id);
  }
}