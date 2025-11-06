import { UserModel } from "../db/models/user.js"
import { Op } from "sequelize";

export const userRepository = {
  createUser: async (user) => {
    await UserModel.create(user);
  },
  updateUser: async (id, user) => {
    await UserModel.update(user, { where: { id } });
  },

  getUser: async (id) => {
    console.log(id);
    const user = await UserModel.findOne({ where: { id } });
    console.log(user);
    return user;
  },

  getUsers: async (page, size, filter) => {
    return await UserModel.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: filter ?? '' } },
          { username: { [Op.like]: filter ?? '' } }
        ]
      },
      limit: size,
      offset: (page - 1) * size
    })
  },

  deleteUser: async (id) => {
    await UserModel.destroy({ where: { id } });
  }


}