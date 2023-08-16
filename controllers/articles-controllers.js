const { fetchArticleById } = require('../models/articles-models');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      res.status(err.status).send({ msg: err.msg });
      console.log(err.msg, '<-----HERE')
    })
    
};