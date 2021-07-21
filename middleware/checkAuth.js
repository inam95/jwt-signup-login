const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: 'No token found'
        }
      ]
    });
  }

  try {
    const user = await JWT.verify(
      token,
      'f4sgaha6282hsh72hshssg72hsnsjaat36hgdg'
    );
    req.userEmail = user.email;
    next();
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Token invalid'
        }
      ]
    });
  }
};
