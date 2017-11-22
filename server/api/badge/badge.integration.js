'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newBadge;

describe('Badge API:', function() {
  describe('GET /yes', function() {
    var badges;

    beforeEach(function(done) {
      request(app)
        .get('/yes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          badges = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      badges.should.be.instanceOf(Array);
    });
  });

  describe('POST /yes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/yes')
        .send({
          name: 'New Badge',
          info: 'This is the brand new badge!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBadge = res.body;
          done();
        });
    });

    it('should respond with the newly created badge', function() {
      newBadge.name.should.equal('New Badge');
      newBadge.info.should.equal('This is the brand new badge!!!');
    });
  });

  describe('GET /yes/:id', function() {
    var badge;

    beforeEach(function(done) {
      request(app)
        .get(`/yes/${newBadge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          badge = res.body;
          done();
        });
    });

    afterEach(function() {
      badge = {};
    });

    it('should respond with the requested badge', function() {
      badge.name.should.equal('New Badge');
      badge.info.should.equal('This is the brand new badge!!!');
    });
  });

  describe('PUT /yes/:id', function() {
    var updatedBadge;

    beforeEach(function(done) {
      request(app)
        .put(`/yes/${newBadge._id}`)
        .send({
          name: 'Updated Badge',
          info: 'This is the updated badge!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBadge = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBadge = {};
    });

    it('should respond with the updated badge', function() {
      updatedBadge.name.should.equal('Updated Badge');
      updatedBadge.info.should.equal('This is the updated badge!!!');
    });

    it('should respond with the updated badge on a subsequent GET', function(done) {
      request(app)
        .get(`/yes/${newBadge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let badge = res.body;

          badge.name.should.equal('Updated Badge');
          badge.info.should.equal('This is the updated badge!!!');

          done();
        });
    });
  });

  describe('PATCH /yes/:id', function() {
    var patchedBadge;

    beforeEach(function(done) {
      request(app)
        .patch(`/yes/${newBadge._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Badge' },
          { op: 'replace', path: '/info', value: 'This is the patched badge!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBadge = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBadge = {};
    });

    it('should respond with the patched badge', function() {
      patchedBadge.name.should.equal('Patched Badge');
      patchedBadge.info.should.equal('This is the patched badge!!!');
    });
  });

  describe('DELETE /yes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/yes/${newBadge._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when badge does not exist', function(done) {
      request(app)
        .delete(`/yes/${newBadge._id}`)
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
