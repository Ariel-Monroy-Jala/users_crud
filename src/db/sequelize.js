import { Sequelize } from "sequelize";

const connection = `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(connection)

export const sequelize = 
    new Sequelize(connection);

export const initConnection = async () => {
  console.log('Starting DB connection');
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('DB connected');
}