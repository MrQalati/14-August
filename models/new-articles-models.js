const db = require('../db/connection');

exports.fetchAllArticles = () => {
  return db.query(`
    SELECT
      articles.article_id,
      articles.author,
      articles.topic,
      articles.title,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
  `).then((result) => {
    return result.rows;
  });
};