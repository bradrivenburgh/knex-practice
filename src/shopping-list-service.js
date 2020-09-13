const ShoppingListService = {
  getAllItems(knex) {
    return knex
      .select('*')
      .from('shopping_list');
  },
  getById(knex, itemId) {
    return knex
      .select('*')
      .from('shopping_list')
      .where(
        'id',
        '=',
        itemId
      );
  },
  deleteItem(knex, itemId) {
    return knex
      .del()
      .from('shopping_list')
      .where('id', itemId);
  },
  updateItem(knex, itemId, updatedContent) {
    return knex
      .update(updatedContent)
      .from('shopping_list')
      .where('id', itemId);
  },
  insertItem(knex, itemToInsert) {
    return knex
      .insert(itemToInsert)
      .into('shopping_list')
      .returning('*')
      .then(result => result[0]);
  }
}

module.exports = ShoppingListService;