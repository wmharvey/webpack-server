const mongoose = require( 'mongoose' );
const dbURI = 'mongodb://whitney:abc@ds011228.mongolab.com:11228/capsule-wardrobe';
const app = require('./app');
mongoose.Promise = global.Promise;

mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
  app.listen(8000, () => {
    console.log('Listening on port 8000...');
  });
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
