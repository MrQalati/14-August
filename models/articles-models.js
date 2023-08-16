const db = require('../db/connection');

exports.fetchArticleById = (article_id) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id]).then((result) => {
    const [article] = result.rows;
    if (!article) {
      throw { status: 404, msg: 'Article not found' };
    }
    return article;
  });
};