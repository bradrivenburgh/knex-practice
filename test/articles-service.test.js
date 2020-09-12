const ArticlesService = require('../src/articles-service');
const knex = require('knex');

/** NOTE:
 * Before running tests; create the table in the test db if it doesn't
 * already exist.
 */

describe('ArticlesService object', () => {
  let db;

  // Create test data; this will be our expected value
  let testArticles = [
      {
        id: 1,
        date_published: new Date('2029-01-22T16:28:32.615Z'),
        title: 'First test post!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
      },
      {
        id: 2,
        date_published: new Date('2029-01-22T16:28:32.615Z'),
        title: 'Second test post!',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
      },
      {
        id: 3,
        date_published: new Date('2029-01-22T16:28:32.615Z'),
        title: 'Third test post!',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
      },
  ];

  // Create knex instance before running each test
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  // Clear data from test table before running the tests
  before(() => db('blogful_articles').truncate());

  // Clear data from test table after each test
  afterEach(() => db('blogful_articles').truncate());

  // Disconnect from the knex-practice-test db after running the tests
  after(() => db.destroy());

  context(`Given 'blogful_articles' has data`, () => {
    // Seed the test table with the expected values from testArticles
    before(() => {
      return db
        .into('blogful_articles')
        .insert(testArticles);
    });

    // Test that ArticlesService.getAllArticles gets the data from the table
    it(`getAllArticles() resolves all articles from 'blogful_articles' table` , () => {
      return ArticlesService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql(testArticles);
        });
    });
  });

  context(`Given 'blogful_articles' has no data`, () => {
    it(`getAllArticles() resolves an empty array`, () => {
      return ArticlesService.getAllArticles(db)
        .then(actual => expect(actual).to.eql([]));
    });

    it(`insertArticle() inserts a new article and resolves the new article with an 'id'`, () => {
      const newArticle = {
        title: 'Test new title',
        content: 'Test new content',
        date_published: new Date('2020-01-01T00:00:00.000Z')
      }

      return ArticlesService.insertArticle(db, newArticle)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            title: newArticle.title,
            content: newArticle.content,
            date_published: newArticle.date_published
          });
        });
    });
  });
});
