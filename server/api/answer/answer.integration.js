'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAnswer;

describe('Answer API:', function() {
  describe('GET /api/answers', function() {
    var answers;

    beforeEach(function(done) {
      request(app)
        .get('/api/answers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          answers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      answers.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/answers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/answers')
        .send({
          name: 'New Answer',
          info: 'This is the brand new answer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAnswer = res.body;
          done();
        });
    });

    it('should respond with the newly created answer', function() {
      newAnswer.name.should.equal('New Answer');
      newAnswer.info.should.equal('This is the brand new answer!!!');
    });
  });

  describe('GET /api/answers/:id', function() {
    var answer;

    beforeEach(function(done) {
      request(app)
        .get(`/api/answers/${newAnswer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          answer = res.body;
          done();
        });
    });

    afterEach(function() {
      answer = {};
    });

    it('should respond with the requested answer', function() {
      answer.name.should.equal('New Answer');
      answer.info.should.equal('This is the brand new answer!!!');
    });
  });

  describe('PUT /api/answers/:id', function() {
    var updatedAnswer;

    beforeEach(function(done) {
      request(app)
        .put(`/api/answers/${newAnswer._id}`)
        .send({
          name: 'Updated Answer',
          info: 'This is the updated answer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAnswer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAnswer = {};
    });

    it('should respond with the updated answer', function() {
      updatedAnswer.name.should.equal('Updated Answer');
      updatedAnswer.info.should.equal('This is the updated answer!!!');
    });

    it('should respond with the updated answer on a subsequent GET', function(done) {
      request(app)
        .get(`/api/answers/${newAnswer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let answer = res.body;

          answer.name.should.equal('Updated Answer');
          answer.info.should.equal('This is the updated answer!!!');

          done();
        });
    });
  });

  describe('PATCH /api/answers/:id', function() {
    var patchedAnswer;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/answers/${newAnswer._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Answer' },
          { op: 'replace', path: '/info', value: 'This is the patched answer!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAnswer = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAnswer = {};
    });

    it('should respond with the patched answer', function() {
      patchedAnswer.name.should.equal('Patched Answer');
      patchedAnswer.info.should.equal('This is the patched answer!!!');
    });
  });

  describe('DELETE /api/answers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/answers/${newAnswer._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when answer does not exist', function(done) {
      request(app)
        .delete(`/api/answers/${newAnswer._id}`)
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
