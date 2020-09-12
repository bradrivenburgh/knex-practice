const ArticlesService = {
  getAllArticles(knexInstance) {
    return knexInstance
      .select('*')
      .from('blogful_articles');
  },
  insertArticle(knexInstance, newArticle) {
    return knexInstance
      .insert(newArticle)
      .into('blogful_articles')
      .returning('*')
      .then(rows => {
        return rows[0];
      })
  },
  
};

module.exports = ArticlesService;