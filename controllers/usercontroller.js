// Fixed COMPILATION ERROR: express module was not imported before usage of Router
import { Router } from 'express';
import jwt from 'jsonwebtoken';
// Fixed COMPILATION ERROR: incorrect module name - bcrypt, correct - bcryptjs
import bcrypt from 'bcryptjs';

import db from '../db.js';
import createUser from '../models/user.js';

const router = Router();
const User = createUser(db);

const JWT_EXPIRES = 60 * 60 * 24;
const JWT_SECRET = 'lets_play_sum_games_man';

const getToken = id => jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

router.post('/signup', (req, res) => {
  const { full_name: fullName, username, password, email } = req.body.user;
  User.create({
    full_name: fullName,
    username,
    // Fixed LOGICAL ERROR: Misspelled property name passwordhash, correct - passwordHash
    passwordHash: bcrypt.hashSync(password, 10),
    email,
  }).then(
    user => res.json({ user, token: getToken(user.id) }),
    err => res.status(500).send(err.message)
  );
});

router.post('/signin', (req, res) => {
  const { username, password } = req.body.user;
  User.findOne({ where: { username } }).then(user => {
    if (user) {
      bcrypt.compare(password, user.passwordHash, (err, matches) => {
        if (matches) {
          res.json({
            user,
            message: 'Successfully authenticated.',
            sessionToken: getToken(user.id),
          });
        } else {
          res.status(401).send({ error: 'Passwords do not match.' });
        }
      });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  });
});

export default router;
