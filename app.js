require('dotenv').config();
var express = require('express');
var app = express();
var db = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller');

const PORT = 4000;

db.sync();
// Fixed LOGICAL ERROR: bodyParser itself was passed, not the json middleware
app.use(require('body-parser').json());
app.use('/api/auth', user);

// Fixed LOGICAL ERROR: validate-session middleware was used for the whole app, not only for game route
app.use('/api/game', require('./middleware/validate-session'), game);

// Fixed LOGICAL ERROR: Port was not specified
app.listen(PORT, function () {
  console.log('App is listening on 4000');
});
