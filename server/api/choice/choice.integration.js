'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newChoice;

describe('Choice API:', function() {
  describe('GET /api/choices', function() {
    var choices;

    beforeEach(function(done) {
      request(app)
        .get('/api/choices')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          choices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      choices.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/choices', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/choices')
        .send({
          name: 'New Choice',
          info: 'This is the brand new choice!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newChoice = res.body;
          done();
        });
    });

    it('should respond with the newly created choice', function() {
      newChoice.name.should.equal('New Choice');
      newChoice.info.should.equal('This is the brand new choice!!!');
    });
  });

  describe('GET /api/choices/:id', function() {
    var choice;

    beforeEach(function(done) {
      request(app)
        .get(`/api/choices/${newChoice._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          choice = res.body;
          done();
        });
    });

    afterEach(function() {
      choice = {};
    });

    it('should respond with the requested choice', function() {
      choice.name.should.equal('New Choice');
      choice.info.should.equal('This is the brand new choice!!!');
    });
  });

  describe('PUT /api/choices/:id', function() {
    var updatedChoice;

    beforeEach(function(done) {
      request(app)
        .put(`/api/choices/${newChoice._id}`)
        .send({
          name: 'Updated Choice',
          info: 'This is the updated choice!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedChoice = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedChoice = {};
    });

    it('should respond with the updated choice', function() {
      updatedChoice.name.should.equal('Updated Choice');
      updatedChoice.info.should.equal('This is the updated choice!!!');
    });

    it('should respond with the updated choice on a subsequent GET', function(done) {
      request(app)
        .get(`/api/choices/${newChoice._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let choice = res.body;

          choice.name.should.equal('Updated Choice');
          choice.info.should.equal('This is the updated choice!!!');

          done();
        });
    });
  });

  describe('PATCH /api/choices/:id', function() {
    var patchedChoice;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/choices/${newChoice._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Choice' },
          { op: 'replace', path: '/info', value: 'This is the patched choice!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedChoice = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedChoice = {};
    });

    it('should respond with the patched choice', function() {
      patchedChoice.name.should.equal('Patched Choice');
      patchedChoice.info.should.equal('This is the patched choice!!!');
    });
  });

  describe('DELETE /api/choices/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/choices/${newChoice._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when choice does not exist', function(done) {
      request(app)
        .delete(`/api/choices/${newChoice._id}`)
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
