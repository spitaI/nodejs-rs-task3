import { Router } from 'express';

import db from '../db.js';
import createGame from '../models/game.js';

const router = Router();
const Game = createGame(db);

router.get('/all', (req, res) => {
  Game.findAll({ where: { owner_id: req.user.id } }).then(
    // Fixed LOGICAL ERROR: incorrect variable name was used - games, correct - data
    data => res.json({ games: data, message: 'Data fetched.' }),
    () => res.status(404).json({ message: 'Data not found' })
  );
});

router.get('/:id', (req, res) => {
  Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } }).then(
    game => res.json({ game }),
    err => res.status(404).json({ message: 'Data not found.' })
  );
});

router.post('/create', (req, res) => {
  Game.create({
    ...req.body.game,
    // Fixed LOGICAL ERROR: user id was taken from req.body.user.id, correct - req.user.id
    owner_id: req.user.id,
  }).then(
    game => res.json({ game, message: 'Game created.' }),
    err => res.status(500).json({ message: err.message })
  );
});

router.put('/update/:id', (req, res) => {
  Game.update(
    {
      ...req.body.game,
    },
    {
      where: {
        id: req.params.id,
        // Fixed LOGICAL ERROR: missing .id
        owner_id: req.user.id,
      },
    }
  ).then(
    game => res.json({ game, message: 'Successfully updated.' }),
    err => res.status(500).json({ message: err.message })
  );
});

router.delete('/remove/:id', (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
      owner_id: req.user.id,
    },
  }).then(
    game => res.json({ game, message: 'Successfully deleted' }),
    err => res.status(500).json({ error: err.message })
  );
});

// Fixed COMPILATION ERROR: exported incorrect variable name routers, correct - router
export default router;
