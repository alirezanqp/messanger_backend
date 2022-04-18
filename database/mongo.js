const mongoose = require('mongoose')

const { MONGO_DBNAME, MONGO_HOST, MONGO_PORT } = process.env

const mongoConncetion = () => {
  mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`)
    .then(() => console.log('> MongoDB Database Connected'))
    .catch(error => {
      console.log('database conection failed! ' + error.message)
    })
}

module.exports = mongoConncetion
