'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newQuelqueendpoint;

describe('Quelqueendpoint API:', function() {
  describe('GET /api/quelqueendpoints', function() {
    var quelqueendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/quelqueendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          quelqueendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      quelqueendpoints.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/quelqueendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/quelqueendpoints')
        .send({
          name: 'New Quelqueendpoint',
          info: 'This is the brand new quelqueendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQuelqueendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created quelqueendpoint', function() {
      newQuelqueendpoint.name.should.equal('New Quelqueendpoint');
      newQuelqueendpoint.info.should.equal('This is the brand new quelqueendpoint!!!');
    });
  });

  describe('GET /api/quelqueendpoints/:id', function() {
    var quelqueendpoint;

    beforeEach(function(done) {
      request(app)
        .get(`/api/quelqueendpoints/${newQuelqueendpoint._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          quelqueendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      quelqueendpoint = {};
    });

    it('should respond with the requested quelqueendpoint', function() {
      quelqueendpoint.name.should.equal('New Quelqueendpoint');
      quelqueendpoint.info.should.equal('This is the brand new quelqueendpoint!!!');
    });
  });

  describe('PUT /api/quelqueendpoints/:id', function() {
    var updatedQuelqueendpoint;

    beforeEach(function(done) {
      request(app)
        .put(`/api/quelqueendpoints/${newQuelqueendpoint._id}`)
        .send({
          name: 'Updated Quelqueendpoint',
          info: 'This is the updated quelqueendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQuelqueendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuelqueendpoint = {};
    });

    it('should respond with the updated quelqueendpoint', function() {
      updatedQuelqueendpoint.name.should.equal('Updated Quelqueendpoint');
      updatedQuelqueendpoint.info.should.equal('This is the updated quelqueendpoint!!!');
    });

    it('should respond with the updated quelqueendpoint on a subsequent GET', function(done) {
      request(app)
        .get(`/api/quelqueendpoints/${newQuelqueendpoint._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let quelqueendpoint = res.body;

          quelqueendpoint.name.should.equal('Updated Quelqueendpoint');
          quelqueendpoint.info.should.equal('This is the updated quelqueendpoint!!!');

          done();
        });
    });
  });

  describe('PATCH /api/quelqueendpoints/:id', function() {
    var patchedQuelqueendpoint;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/quelqueendpoints/${newQuelqueendpoint._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Quelqueendpoint' },
          { op: 'replace', path: '/info', value: 'This is the patched quelqueendpoint!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQuelqueendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQuelqueendpoint = {};
    });

    it('should respond with the patched quelqueendpoint', function() {
      patchedQuelqueendpoint.name.should.equal('Patched Quelqueendpoint');
      patchedQuelqueendpoint.info.should.equal('This is the patched quelqueendpoint!!!');
    });
  });

  describe('DELETE /api/quelqueendpoints/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/quelqueendpoints/${newQuelqueendpoint._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when quelqueendpoint does not exist', function(done) {
      request(app)
        .delete(`/api/quelqueendpoints/${newQuelqueendpoint._id}`)
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
