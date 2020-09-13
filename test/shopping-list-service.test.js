const ShoppingListService = require("../src/shopping-list-service");
const knex = require("knex");

/** NOTE:
 * Before running tests; create the table in the test db if it doesn't
 * already exist.
 */

describe("ShoppingListService object", () => {
  // Declare database variable
  let db;

  // Create test data; this will be our expected value
  let testItems = [
    {
      id: 1,
      name: "Fish tricks",
      price: 13.1,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: false,
      category: Main,
    },
    {
      id: 2,
      name: "Not Dogs",
      price: 4.99,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: true,
      category: Snack,
    },
    {
      id: 3,
      name: "Tofurkey",
      price: 2.5,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: false,
      category: Breakfast,
    },
    {
      id: 4,
      name: "Turnip the Beat",
      price: 0.2,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: true,
      category: Lunch,
    },
  ];

  // Create knex instance (db) before running all tests
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  // Clear data from test table before running all tests
  before(() => db('shopping_list').truncate());

  //Disconnect from the knex-practice-test db after running all tests
  after(() => db('shopping_list').destroy());

  //Clear data from the test table after each test
  afterEach(() => db('shopping_list').truncate());

  context(`Given 'shopping_list' has data`, () => {
    // Insert test data before each test
    beforeEach(() => {
      return db
        .insert(testItems)
        .into('shopping_list');
    });

    it(`getAllItems`, () => {});

    it(`getById()`, () => {});

    it(`deleteItem()`, () => {});

    it(`updateItem()`, () => {});
  });

  context(`Given 'shopping_list has no data`, () => {
    it(`getAllItems()`, () => {});

    it("insertItem()", () => {});
  });
});
