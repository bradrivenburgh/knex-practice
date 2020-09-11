require('dotenv').config();
const knex = require('knex');

//Create knex instance
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchItemsByText(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log('SEARCH TERM', {searchTerm});
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
      console.log('PAGINATE ITEMS', { pageNumber });
      console.log(result);
    });
}

function itemsAddedAfterDate(daysAgo) {
  knexInstance
    .select('name', 'price', 'date_added', 'category')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .orderBy([{column: 'date_added', order: 'ASC'}])
    .then(result => {
      console.log(`ITEMS ADDED IN THE LAST ${daysAgo} days:`);
      console.log(result);
    });
}

function totalPriceByCategory() {
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .orderBy([{ column: 'category', order: 'ASC' }])
    .then(result => {
      console.log('COST PER CATEGORY:');
      console.log(result);
    });
}

//searchItemsByText('turnip');
//paginateItems(2)
//itemsAddedAfterDate(10);
totalPriceByCategory();