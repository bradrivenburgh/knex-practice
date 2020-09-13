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
      price: "13.10",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: false,
      category: "Main",
    },
    {
      id: 2,
      name: "Not Dogs",
      price: "4.99",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: true,
      category: "Snack",
    },
    {
      id: 3,
      name: "Tofurkey",
      price: "2.50",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: false,
      category: "Breakfast",
    },
    {
      id: 4,
      name: "Turnip the Beat",
      price: "0.20",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: true,
      category: "Lunch",
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
  after(() => db.destroy());

  //Clear data from the test table after each test
  afterEach(() => db('shopping_list').truncate());

  context(`Given 'shopping_list' has data`, () => {
    // Insert test data before each test
    beforeEach(() => {
      return db
        .insert(testItems)
        .into('shopping_list');
    });
    
    // Item ID to use in tests retrieving, updating, or deleting a single item
    const itemId = 1;

    it(`getAllItems() resolves all items from 'shopping_list'`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => expect(actual).to.eql(testItems));
    });

    it(`getById() resolves a single item object from 'shopping_list'`, () => {
      return ShoppingListService.getById(db, itemId)
        .then(actual => {
          expect(actual[itemId - 1]).to.eql(testItems[itemId - 1]);
        });
    });

    it(`deleteItem() should return 0 rows affected`, () => {
      return ShoppingListService.deleteItem(db, 500)
        .then(actual => {
          expect(actual).to.eq(0);
        });
    });

    it(`deleteItem() deletes a single item by ID from 'shopping_list'`, () => {
      // Simulate the SL post-deleteItem() since deleteItem() just returns a number
      const expected = testItems.filter(item => item.id !== itemId);

      // The first .then() gets and passes through the SL post-deleteItem; 
      // the second .then() receives the mutated SL and makes the assertion
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(actual => {
          expect(actual).to.eql(expected);
        });
    });

    it(`updateItem() should return 0 rows affected`, () => {
      const updatedContent = {
        name: "Gushers",
        price: "5.00",
        date_added: new Date("2029-01-22T16:28:32.615Z"),
        checked: false,
        category: "Snack",  
      };
      return ShoppingListService.updateItem(db, 500, updatedContent)
        .then(actual => {
          expect(actual).to.eq(0);
        });
    });

    it(`updateItem() updates an existing item in 'shopping_list'`, () => {
      const updatedContent = {
        name: "Gushers",
        price: "5.00",
        date_added: new Date("2029-01-22T16:28:32.615Z"),
        checked: false,
        category: "Snack",  
      }
      return ShoppingListService.updateItem(db, itemId, updatedContent)
        .then(() => ShoppingListService.getById(db, itemId))
        .then(actual => {
          expect(actual[itemId - 1]).to.eql({id: itemId, ...updatedContent});
        });
    });
  });

  context(`Given 'shopping_list has no data`, () => {
    it(`getAllItems() resolves all items from 'shopping_list'`, () => {
      return ShoppingListService.getAllItems(db)
      .then(actual => expect(actual).to.eql([]));
    });

    it("insertItem() inserts a new item and resolves the new article with an 'id'", () => {
      const itemToInsert = {
        id: 1,
        name: "Gushers",
        price: "5.00",
        date_added: new Date("2029-01-22T16:28:32.615Z"),
        checked: false,
        category: "Snack",  
      }
  
      return ShoppingListService.insertItem(db, itemToInsert)
        .then(actual => {
          expect(actual).to.eql(itemToInsert);
        });      
    });
  });
});
