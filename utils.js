import jwt from 'jsonwebtoken';
import config from './config.js';

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.rows[0].id,
      username: user.rows[0].username,
      role: (user.rows[0].role == 1),
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

const isAuth = (req, res, next) => {
  const token = 'Bearer ' + req.cookies.token;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      console.log(req.user)
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

const checkAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.role) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

export { getToken, isAuth, checkAdmin };