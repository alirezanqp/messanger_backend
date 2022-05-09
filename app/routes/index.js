const authRoutes = require('./auth');
const userRoutes = require('./user');
const initRoutes = require('./init');
const roomRoutes = require('./room')
const messageRoutes = require('./message')
const chatRoutes = require('./chat')

const auth = require('../middlewares/auth')

module.exports = (app) => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/user', auth, userRoutes)
  app.use('/api/v1/init', auth, initRoutes)
  app.use('/api/v1/room', auth, roomRoutes)
  app.use('/api/v1/chat', auth, chatRoutes)
  app.use('/api/v1/message', auth, messageRoutes)
}
