const db = require('../db/connection');

exports.fetchAllArticles = () => {
    return db.query(`
      SELECT articles.*, COUNT(comments.comment_id) ::INT AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;
    `).then((result) => {
        console.log('Fetched data:', result.rows);
        return result.rows;
    });
  };