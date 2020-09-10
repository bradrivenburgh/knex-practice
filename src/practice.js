require('dotenv').config();
const knex = require('knex');

//Create knex instance
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchByProductName(searchTerm) {
  knexInstance
  .from('amazong_products')
  .select('product_id', 'name', 'price', 'category')
  .where('name', 'ILIKE', `%${searchTerm}%`)
  .first()
  .then(result => {
    console.log(result);
  });
}

function paginateProducts(page) {
  const productsPerPage = 10;
  const offset = productsPerPage * (page - 1)
  knexInstance
    .from('amazong_products')
    .select('product_id', 'name', 'price', 'category')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

//searchByProductName('holo');
paginateProducts(2);