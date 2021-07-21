const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const { users } = require('../db');

router.post(
  '/signup',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check(
      'password',
      'please provide a password greater than 6 characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const { password, email } = req.body;

    // Validate inputs
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    // Validate if user already exist
    let user = users.find((user) => user.email === email);

    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'This user already exist'
          }
        ]
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      email,
      password: hashedPassword
    });

    const token = await JWT.sign(
      {
        email
      },
      'f4sgaha6282hsh72hshssg72hsnsjaat36hgdg',
      {
        expiresIn: 3600000
      }
    );

    res.json({ token });
  }
);

router.post('/login', async (req, res) => {
  const { password, email } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Credentials'
        }
      ]
    });
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Credentials'
        }
      ]
    });
  }

  const token = await JWT.sign(
    {
      email
    },
    'f4sgaha6282hsh72hshssg72hsnsjaat36hgdg',
    {
      expiresIn: 3600000
    }
  );

  res.json({ token });
});

router.get('/all', (req, res) => {
  res.json(users);
});

module.exports = router;
