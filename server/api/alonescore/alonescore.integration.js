'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAlonescore;

describe('Alonescore API:', function() {
  describe('GET /api/alonescores', function() {
    var alonescores;

    beforeEach(function(done) {
      request(app)
        .get('/api/alonescores')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          alonescores = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      alonescores.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/alonescores', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/alonescores')
        .send({
          name: 'New Alonescore',
          info: 'This is the brand new alonescore!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAlonescore = res.body;
          done();
        });
    });

    it('should respond with the newly created alonescore', function() {
      newAlonescore.name.should.equal('New Alonescore');
      newAlonescore.info.should.equal('This is the brand new alonescore!!!');
    });
  });

  describe('GET /api/alonescores/:id', function() {
    var alonescore;

    beforeEach(function(done) {
      request(app)
        .get(`/api/alonescores/${newAlonescore._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          alonescore = res.body;
          done();
        });
    });

    afterEach(function() {
      alonescore = {};
    });

    it('should respond with the requested alonescore', function() {
      alonescore.name.should.equal('New Alonescore');
      alonescore.info.should.equal('This is the brand new alonescore!!!');
    });
  });

  describe('PUT /api/alonescores/:id', function() {
    var updatedAlonescore;

    beforeEach(function(done) {
      request(app)
        .put(`/api/alonescores/${newAlonescore._id}`)
        .send({
          name: 'Updated Alonescore',
          info: 'This is the updated alonescore!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAlonescore = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAlonescore = {};
    });

    it('should respond with the updated alonescore', function() {
      updatedAlonescore.name.should.equal('Updated Alonescore');
      updatedAlonescore.info.should.equal('This is the updated alonescore!!!');
    });

    it('should respond with the updated alonescore on a subsequent GET', function(done) {
      request(app)
        .get(`/api/alonescores/${newAlonescore._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let alonescore = res.body;

          alonescore.name.should.equal('Updated Alonescore');
          alonescore.info.should.equal('This is the updated alonescore!!!');

          done();
        });
    });
  });

  describe('PATCH /api/alonescores/:id', function() {
    var patchedAlonescore;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/alonescores/${newAlonescore._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Alonescore' },
          { op: 'replace', path: '/info', value: 'This is the patched alonescore!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAlonescore = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAlonescore = {};
    });

    it('should respond with the patched alonescore', function() {
      patchedAlonescore.name.should.equal('Patched Alonescore');
      patchedAlonescore.info.should.equal('This is the patched alonescore!!!');
    });
  });

  describe('DELETE /api/alonescores/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/alonescores/${newAlonescore._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when alonescore does not exist', function(done) {
      request(app)
        .delete(`/api/alonescores/${newAlonescore._id}`)
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
