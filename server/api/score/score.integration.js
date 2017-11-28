'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newScore;

describe('Score API:', function() {
  describe('GET /api/scores', function() {
    var scores;

    beforeEach(function(done) {
      request(app)
        .get('/api/scores')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          scores = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      scores.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/scores', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/scores')
        .send({
          name: 'New Score',
          info: 'This is the brand new score!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newScore = res.body;
          done();
        });
    });

    it('should respond with the newly created score', function() {
      newScore.name.should.equal('New Score');
      newScore.info.should.equal('This is the brand new score!!!');
    });
  });

  describe('GET /api/scores/:id', function() {
    var score;

    beforeEach(function(done) {
      request(app)
        .get(`/api/scores/${newScore._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          score = res.body;
          done();
        });
    });

    afterEach(function() {
      score = {};
    });

    it('should respond with the requested score', function() {
      score.name.should.equal('New Score');
      score.info.should.equal('This is the brand new score!!!');
    });
  });

  describe('PUT /api/scores/:id', function() {
    var updatedScore;

    beforeEach(function(done) {
      request(app)
        .put(`/api/scores/${newScore._id}`)
        .send({
          name: 'Updated Score',
          info: 'This is the updated score!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedScore = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedScore = {};
    });

    it('should respond with the updated score', function() {
      updatedScore.name.should.equal('Updated Score');
      updatedScore.info.should.equal('This is the updated score!!!');
    });

    it('should respond with the updated score on a subsequent GET', function(done) {
      request(app)
        .get(`/api/scores/${newScore._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let score = res.body;

          score.name.should.equal('Updated Score');
          score.info.should.equal('This is the updated score!!!');

          done();
        });
    });
  });

  describe('PATCH /api/scores/:id', function() {
    var patchedScore;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/scores/${newScore._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Score' },
          { op: 'replace', path: '/info', value: 'This is the patched score!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedScore = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedScore = {};
    });

    it('should respond with the patched score', function() {
      patchedScore.name.should.equal('Patched Score');
      patchedScore.info.should.equal('This is the patched score!!!');
    });
  });

  describe('DELETE /api/scores/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/scores/${newScore._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when score does not exist', function(done) {
      request(app)
        .delete(`/api/scores/${newScore._id}`)
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
