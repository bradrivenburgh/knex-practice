const ArticlesService = require('../src/articles-service');
const knex = require('knex');


describe('ArticlesService object', () => {
  // Create knex instance
  let db;

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  describe('getAllArticles()', () => {
    it('resolves all articles from "blogful_articles table"', () => {

    });
  });
});
