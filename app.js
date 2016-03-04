const express = require('express');
const app = express();
const path = require('path');

const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const cors = require('cors')

//Routes
const auth = require('./routes/auth');
const capsules = require('./routes/capsules');
const clothes = require('./routes/clothes');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( express.static( path.join(__dirname, '/dist/public') ) );

var jwtCheck = jwt({
  secret: process.env.JWT_SECRET
});

app.use('/api/auth', auth);
app.use('/api/capsules', jwtCheck, capsules);
app.use('/api/clothes', jwtCheck, clothes);

app.use(function(err, req, res, next) {
  res.status(401).send(err);
});
app.use(function(req, res, next) {
  res.status(404).send('404, no page found: ' + req.url);
});

module.exports = app;
