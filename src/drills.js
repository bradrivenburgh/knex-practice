require('dotenv').config();
const knex = require('knex');

//Create knex instance
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchItemsByText(searchTerm) {
  knexInstance
    .select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

function paginateItems(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

//searchItemsByText('turnip');
paginateItems(2)
