'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newQuestion;

describe('Question API:', function() {
  describe('GET /api/questions', function() {
    var questions;

    beforeEach(function(done) {
      request(app)
        .get('/api/questions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          questions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      questions.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/questions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/questions')
        .send({
          name: 'New Question',
          info: 'This is the brand new question!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQuestion = res.body;
          done();
        });
    });

    it('should respond with the newly created question', function() {
      newQuestion.name.should.equal('New Question');
      newQuestion.info.should.equal('This is the brand new question!!!');
    });
  });

  describe('GET /api/questions/:id', function() {
    var question;

    beforeEach(function(done) {
      request(app)
        .get(`/api/questions/${newQuestion._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          question = res.body;
          done();
        });
    });

    afterEach(function() {
      question = {};
    });

    it('should respond with the requested question', function() {
      question.name.should.equal('New Question');
      question.info.should.equal('This is the brand new question!!!');
    });
  });

  describe('PUT /api/questions/:id', function() {
    var updatedQuestion;

    beforeEach(function(done) {
      request(app)
        .put(`/api/questions/${newQuestion._id}`)
        .send({
          name: 'Updated Question',
          info: 'This is the updated question!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQuestion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuestion = {};
    });

    it('should respond with the updated question', function() {
      updatedQuestion.name.should.equal('Updated Question');
      updatedQuestion.info.should.equal('This is the updated question!!!');
    });

    it('should respond with the updated question on a subsequent GET', function(done) {
      request(app)
        .get(`/api/questions/${newQuestion._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let question = res.body;

          question.name.should.equal('Updated Question');
          question.info.should.equal('This is the updated question!!!');

          done();
        });
    });
  });

  describe('PATCH /api/questions/:id', function() {
    var patchedQuestion;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/questions/${newQuestion._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Question' },
          { op: 'replace', path: '/info', value: 'This is the patched question!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQuestion = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQuestion = {};
    });

    it('should respond with the patched question', function() {
      patchedQuestion.name.should.equal('Patched Question');
      patchedQuestion.info.should.equal('This is the patched question!!!');
    });
  });

  describe('DELETE /api/questions/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/questions/${newQuestion._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when question does not exist', function(done) {
      request(app)
        .delete(`/api/questions/${newQuestion._id}`)
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
