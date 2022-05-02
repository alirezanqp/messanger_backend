const authRouter = require('./auth')
const userRouter = require('./user');

module.exports = (app) => {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/user', userRouter)
}
