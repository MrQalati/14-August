const express = require('express');
const app = express();
const {getAllTopics} = require ('./controllers/topics-controller')


app.get('/api/topics', getAllTopics)

app.use((_, res) => {
    res.status(404).send({msg : 'Endpoint not found'})
})




module.exports = app