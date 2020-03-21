/* eslint-disable no-undef */
// To disable HTTP logs
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Movies API', () => {
  let app, server;

  before('staring server', function() {
    app = require('../app');
    server = chai.request(app).keepOpen();
  });

  it('should GET all movies', done => {
    server.get('/rest/movies/all').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.be.above(10);
      done();
    });
  });
  // new test
  it('should return all movies by genres', done => {
    server.get('/rest/movies/byGenre/Action').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should return a specific movie by id', done => {
    server.get('/rest/movie/1').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });

  after('closing server', function() {
    server.close();
  });
});
