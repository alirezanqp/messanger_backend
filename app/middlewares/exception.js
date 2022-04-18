module.exports = (app) => {
  app.use((error, req, res, next) => {
    const status = error.status || 500
    res.send({
      status,
      code: 'Exception',
      en_msg: error.message,
      fa_msg: 'خطایی در عملیات مورد نظر رخ داده است'
    })
  })
}
