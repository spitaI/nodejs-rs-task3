import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 5433;

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || DEFAULT_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || DEFAULT_PORT,
  }
);

sequelize.authenticate().then(
  () => console.log('Connected to DB'),
  () => console.log(`Error: ${err}`)
);

// Fixed COMPILATION ERROR: sequelize were not exported from module
export default sequelize;
