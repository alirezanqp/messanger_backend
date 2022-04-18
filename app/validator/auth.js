const { body, validationResult } = require('express-validator')

module.exports = new class {
  registerValidator () {
    return [
      body('first_name').notEmpty().withMessage('fisrt name cant empty'),
      body('last_name').notEmpty().withMessage('last name cant empty'),
      body('email').isEmail().withMessage('email is invalid!'),
      body('password').notEmpty().withMessage('password cant empty')
        .isLength({ min: 8 }).withMessage('must be at least 8 chars long')
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
