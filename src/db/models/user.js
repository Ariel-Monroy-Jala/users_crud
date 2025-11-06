import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

export const UserModel = sequelize.define('users', {
  id: {
    type: DataTypes.UUID, 
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set (value) {
      const salt = bcrypt.genSaltSync(10);
      this.setDataValue('password',bcrypt.hashSync(value,salt));
    }
  }
})

