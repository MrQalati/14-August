const db = require ('../db/connection')





exports.fetchAllTopics = () => {

    return db.query('SELECT * FROM topics;').then((result) => {
        const topics = result.rows;

        if (topics.length === 0) {
            throw { status: 404, msg: 'No topics found' }
            }      
               
            return topics
    })
}