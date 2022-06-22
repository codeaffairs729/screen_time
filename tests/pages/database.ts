// const { Sequelize } = require('sequelize');
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('postgres://dashboard_api:dashboard_api@35.224.218.76:5432/dashboard_api', {logging: false}); // Example for postgres

(async ()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;