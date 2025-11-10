const {query, validationResult} = require('express-validator');

exports.validateUser = [
  query('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),
  query('lastname')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!')
    .bail(),

  query('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email name can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Invalid email address!")
    .bail(),

  query('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail()
    .matches("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@]{3,30}$")
    .withMessage('password must be 8 char., min 1 Upper, min1 number, min 1 spec.char.')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];