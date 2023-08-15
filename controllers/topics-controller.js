
const {fetchAllTopics} = require ('../models/topics-models')





exports.getAllTopics = (req, res, next) => {

    fetchAllTopics()
    .then((topics)=>{

        if (topics.length === 0) {
            throw { status: 404, msg: 'No topics found' }
          }

        res.status(200).send({topics})
    })
    .catch(next)

}