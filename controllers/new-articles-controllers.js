const { fetchAllArticles } = require('../models/new-articles-models');

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles()
      .then((articles) => {
        const modifiedArticles = articles.map((article) => {
          const { body, ...rest } = article;
          return {
            ...rest,         
            comments: article.comments,
          };
        });
        res.status(200).send({ articles: modifiedArticles });
      })
      .catch(next);
  };