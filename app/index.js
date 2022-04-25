const express = require('express')
const app = express()

require('../database/mongo')()
require('./webSocket')(app)
require('./middlewares')(app)
require('./routes')(app)
require('./middlewares/swagger')(app)
require('./middlewares/exception')(app)
require('./middlewares/404')(app)

module.exports = (port) => {
  app.listen(port, () => {
    console.log('> Server is up and running on port : ' + port)
  })
}