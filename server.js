const express = require( 'express' );
const app = express();

app.use( express.static( __dirname + '/public' ) );

app.use( ( req, res, next ) => {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE' );
	res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
	next();
});

app.get('/api/cities', (req, res) => {
	res.send([
		{ city: 'Portland', state: 'Oregon' },
		{ city: 'Seattle', state: 'Washington' },
		{ city: 'New York City', state: 'New York' }
	]);
});

app.listen(8000);
