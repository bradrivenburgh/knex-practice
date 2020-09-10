require('dotenv').config();
const knex = require('knex');

//Create knex instance
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('knex and driver installed correctly');
