const authRouter = require('./auth')
const userRouter = require('./user');
const initRouter = require('./init')
const auth = require('../middlewares/auth')

module.exports = (app) => {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/user', auth, userRouter)
  app.use('/api/v1/init', auth, initRouter)
}
