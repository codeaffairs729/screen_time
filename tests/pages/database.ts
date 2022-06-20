// const { Sequelize } = require('sequelize');
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('postgres://dashboard_api:dashboard_api@127.0.0.1:5432/dashboard_api'); // Example for postgres

(async ()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;