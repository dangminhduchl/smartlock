import jwt from 'jsonwebtoken';
import express from 'express'
import pg from 'pg'
import config from './config.js';

const Pool = pg.Pool
const db = new Pool(config.POSTGRES_INFO)
const getToken = (user) => {
  return jwt.sign(
    {
      id: user.rows[0].id,
      username: user.rows[0].username,
      role: user.rows[0].role,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

const checkAdmin = async (req, res, next) => {
  if(req.headers.cookie == null) {
    res.redirect('/users/signin')
    return
  }
  const token = req.headers.cookie.slice(6, req.headers.cookie.length)
  var id = 0
  jwt.verify(token, config.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Error in authentication' }); 
        return 0
      }
      id = decode.id
  });
  const user = await db.query('SELECT * FROM USERS WHERE id = $1', [id])
  const role = user.rows[0].role
  if(role != 2) res.status(401).send({ message: 'Can not access' });
  else return next()
};

export var getUser = async (req, res) => {
    const token = req.headers.cookie.slice(6, req.headers.cookie.length)
    var id = 0
    jwt.verify(token, config.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Error in authentication' }); 
          return 0
        }
        id = decode.id
    });
    if(id == 0) res.status(500).send('You must log in first') 
    else {
        const user = await db.query('SELECT * FROM USERS WHERE id = $1', [id])
        const role = user.rows[0].role
        return role 
    }
}

export { getToken, checkAdmin};