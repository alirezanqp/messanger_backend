const { body, validationResult } = require('express-validator')

module.exports = new class {
  registerValidator () {
    return [
      body('username').notEmpty().withMessage('fisrt name cant empty')
      .isLength({ max: 20}).withMessage('max 20 chars'),
      body('email').isEmail().withMessage('email is invalid!'),
      body('password').notEmpty().withMessage('password cant empty')
        .isLength({ min: 8 }).withMessage('must be at least 8 chars long')
    ]
  }
  loginValidator() {
    return [
      body('emailOrUsername').not().isEmpty().withMessage('email or username cant be empty'),
      body('password').not().isEmpty().withMessage('password cant be empty')
    ]
  }
  validate (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
}()
