module.exports = (app) => {
  app.use((error, req, res, next) => {
    const status = error.status || 500
    res.send({
      status,
      code: 'Exception',
      en_message: error.message,
      fa_message: 'خطایی در عملیات مورد نظر رخ داده است'
    })
  })
}
