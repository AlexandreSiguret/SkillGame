'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAward;

describe('Award API:', function() {
  describe('GET /api/awards', function() {
    var award;

    beforeEach(function(done) {
      request(app)
        .get('/api/awards')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          award = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      award.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/awards', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/awards')
        .send({
          name: 'New Award',
          info: 'This is the brand new award!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAward = res.body;
          done();
        });
    });

    it('should respond with the newly created award', function() {
      newAward.name.should.equal('New Award');
      newAward.info.should.equal('This is the brand new award!!!');
    });
  });

  describe('GET /api/awards/:id', function() {
    var award;

    beforeEach(function(done) {
      request(app)
        .get(`/api/awards/${newAward._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          award = res.body;
          done();
        });
    });

    afterEach(function() {
      award = {};
    });

    it('should respond with the requested award', function() {
      award.name.should.equal('New Award');
      award.info.should.equal('This is the brand new award!!!');
    });
  });

  describe('PUT /api/awards/:id', function() {
    var updatedAward;

    beforeEach(function(done) {
      request(app)
        .put(`/api/awards/${newAward._id}`)
        .send({
          name: 'Updated Award',
          info: 'This is the updated award!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAward = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAward = {};
    });

    it('should respond with the updated award', function() {
      updatedAward.name.should.equal('Updated Award');
      updatedAward.info.should.equal('This is the updated award!!!');
    });

    it('should respond with the updated award on a subsequent GET', function(done) {
      request(app)
        .get(`/api/awards/${newAward._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let award = res.body;

          award.name.should.equal('Updated Award');
          award.info.should.equal('This is the updated award!!!');

          done();
        });
    });
  });

  describe('DELETE /api/awards/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/awards/${newAward._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when award does not exist', function(done) {
      request(app)
        .delete(`/api/awards/${newAward._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
