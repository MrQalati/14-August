const express = require('express');
const app = express();
const endpointsRouter = require('./endpoints')
const {getAllTopics} = require ('./controllers/topics-controller');
const {getArticleById} = require ('./controllers/articles-controllers')





app.use('/api', endpointsRouter);

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/topics', getAllTopics)

app.use((_, res) => {
    res.status(404).send({msg : 'Endpoint not found'})
})



module.exports = app