const jwt = require('jsonwebtoken')

exports.sign = (data) => {
  return jwt.sign(data, process.env.APP_SECRET, {
    expiresIn: "1h"
  })
}

exports.findToken = (req) => {
    const auth = req.header('authorization')
    if (!auth || auth === undefined) return false;

    const [bearer, token] = auth.split(' ')
    if (!token) return false;

    return token
}

exports.verify = (token) => {
  try {
    const payload = jwt.verify(token, process.env.APP_SECRET)
    return payload
  } catch (error) {
    return false
  }
}

exports.decode = (token) => {
  return jwt.decode(token, process.env.APP_SECRET)
}
