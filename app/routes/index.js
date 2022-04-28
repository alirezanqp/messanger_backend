const authRouter = require('./auth')

module.exports = (app) => {
  app.use('/api/v1/auth', authRouter)
}
