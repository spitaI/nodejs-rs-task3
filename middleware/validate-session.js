import jwt from 'jsonwebtoken';

// Fixed COMPILATION ERROR: db variable was imported from 'sequelize module, and not from db.js'
import db from '../db.js';
import createUser from '../models/user.js';

const User = createUser(db);

const JWT_SECRET = 'lets_play_sum_games_man';

export default (req, res, next) => {
  if (req.method == 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    if (!sessionToken) {
      return res
        .status(403)
        .json({ auth: false, message: 'No token provided.' });
    } else {
      jwt.verify(sessionToken, JWT_SECRET, (err, decoded) => {
        if (decoded) {
          User.findOne({ where: { id: decoded.id } }).then(
            user => {
              req.user = user;
              next();
            },
            () => {
              res.status(401).json({ error: 'Not authorized' });
            }
          );
        } else {
          res.status(401).json({ error: 'Not authorized' });
        }
      });
    }
  }
};
