const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const app = require( '../app' );
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

chai.use(chaiHttp);

describe( 'capsules api', () => {

  var request;
  var capsuleId;

  before( function (done) {
    this.timeout(5000);
    mongoose.connection.open('mongodb://whitney:abc@ds011228.mongolab.com:11228/capsule-wardrobe', () => {
      done();
    });
  });

  beforeEach( () => {
    request = chai.request( app );
  });

  it( 'POST: adds a capsule', done => {
    request
      .post('/api/capsules')
      .send({season: 'Summer', description: '2016'})
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.description).to.equal('2016');
        capsuleId = res.body._id;
        done();
      });
  });

  it( 'GET: returns all capsules', done => {
    request
      .get('/api/capsules')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.length.of.at.least(1);
        done();
      });
  });

  it( 'GET: returns one capsule', done => {
    request
      .get('/api/capsules/' + capsuleId)
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body._id).to.equal(capsuleId);
        done();
      });
  });

  it( 'PATCH: updates a capsule', function(done) {
    request
      .patch('/api/capsules/' + capsuleId)
      .send({season: 'Spring'})
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.season).to.equal('Spring');
        done();
      });
  });

  it( 'DELETE: deletes a capsule', function(done) {
    this.timeout(5000);
    request
      .delete('/api/capsules/' + capsuleId)
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.season).to.equal('Spring');
        done();
      });
  });

  after( done => {
    mongoose.connection.close( () => {
      done();
    });
  });

});
