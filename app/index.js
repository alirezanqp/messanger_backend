const { createServer } = require('http')
const express = require('express')
const app = express()

const httpServer = createServer(app)

/*app.get('/', (req, res) => {
  res.send('Hello')
})*/

require('./database/mongo')()
require('./middlewares')(app)
require('./routes')(app)
require('./webSocket')(httpServer)
require('./middlewares/swagger')(app)
require('./middlewares/exception')(app)
require('./middlewares/404')(app)

module.exports = (port) => {
  httpServer.listen(port, () => {
    console.log('> Server is up and running on port : ' + port)
  })
}