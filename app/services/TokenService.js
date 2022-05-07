const jwt = require('jsonwebtoken')

exports.sign = (data) => {
  return jwt.sign(data, process.env.APP_SECRET, {
    expiresIn: "24h"
  })
}

exports.findToken = (req) => {
    const token = req.header('authorization')
    if (!token || token === undefined) return false;

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
  const payload = jwt.decode(token, process.env.APP_SECRET)
  return payload
}
