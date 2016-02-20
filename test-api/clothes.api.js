const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const app = require( '../app' );
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

chai.use(chaiHttp);

describe( 'clothes api', () => {

  var request;
  var capsuleId;
  var clothesId;

  before( function (done) {
    this.timeout(5000);
    mongoose.connection.open('mongodb://whitney:abc@ds011228.mongolab.com:11228/capsule-wardrobe', () => {
      done();
    });
  });

  beforeEach( () => {
    request = chai.request( app );
  });

  it( 'adds a capsule to add clothes to', done => {
    request
      .post('/api/capsules')
      .send({season: 'Summer', description: '2016'})
      .end( (err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.description).to.equal('2016');
        capsuleId = res.body._id;
        done();
      });
  });

  it( 'POST: adds clothes to a capsule', function(done) {
    this.timeout(5000);
    request
      .post('/api/clothes')
      .send({
        capsule: capsuleId,
        type: 'bottoms',
        description: 'jeans',
        url: 'example.com',
        image: 'exampleimage.jpg',
        importance: 3
      })
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.description).to.equal('jeans');
        clothesId = res.body._id;
        done();
      });
  });

  it( 'GET: returns all clothing items', done => {
    request
      .get('/api/clothes')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.length.of.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it( 'GET: returns one clothing item', done => {
    request
      .get('/api/clothes/' + clothesId)
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body._id).to.equal(clothesId);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it( 'PATCH: updates an item', done => {
    request
      .patch('/api/clothes/' + clothesId)
      .send({description: 'skirt'})
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.description).to.equal('skirt');
        done();
      });
  });

  it( 'DELETE: deletes an item', done => {
    request
      .delete('/api/clothes/' + clothesId)
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  after( done => {
    mongoose.connection.close( () => {
      done();
    });
  });

});
