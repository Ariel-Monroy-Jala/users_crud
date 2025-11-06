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
    if (!id) throw new Error('Invalid request');
    await userRepository.updateUser(id, user);
  },

  getUser: async (id) => {
    if (!id) throw new Error('Invalid request');
    return userRepository.getUser(id);
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
    if (!id) throw Error('Invalid request');
    userRepository.deleteUser(id);
  }
}