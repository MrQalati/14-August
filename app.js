const express = require('express');
const app = express();
const endpointsRouter = require('./endpoints')
const {getAllTopics} = require ('./controllers/topics-controller');
const {getArticleById} = require ('./controllers/articles-controllers')
const {getAllArticles} = require('./controllers/new-articles-controllers')



app.use('/api', endpointsRouter);


app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/topics', getAllTopics);

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/topics', getAllTopics)


app.use((_, res) => {
    res.status(404).send({msg : 'Endpoint not found'})

});

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg : err.msg });
        } else {
            next(err)
        }
    });

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad Request' });
        } else res.status(500).send({ msg: 'Internal Server Error' });
    });  



module.exports = app