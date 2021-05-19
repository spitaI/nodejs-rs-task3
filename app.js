import express from 'express';
import bodyParser from 'body-parser';

import validateSession from './middleware/validate-session.js';
import userController from './controllers/usercontroller.js';
import gameController from './controllers/gamecontroller.js';
import db from './db.js';

const PORT = 4000;
const app = express();

db.sync();

// Fixed LOGICAL ERROR: bodyParser itself was passed, not the json middleware
app.use(bodyParser.json());

app.use('/api/auth', userController);

// Fixed LOGICAL ERROR: validate-session middleware was used for the whole app, not only for game route
app.use('/api/game', validateSession, gameController);

// Fixed LOGICAL ERROR: Port was not specified
app.listen(PORT, () => console.log('App is listening on 4000'));
