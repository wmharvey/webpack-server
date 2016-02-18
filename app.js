const express = require( 'express' );
const app = express();
const capsules = require('./routes/capsules');
const clothes = require('./routes/clothes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use( express.static( __dirname + '/public' ) );

app.use( ( req, res, next ) => {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE' );
	res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
	next();
});

app.use('/api/capsules', capsules);
app.use('/api/clothes', clothes);

module.exports = app;
