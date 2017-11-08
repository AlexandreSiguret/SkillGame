'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newGame;

describe('Game API:', function() {
  describe('GET /api/games', function() {
    var games;

    beforeEach(function(done) {
      request(app)
        .get('/api/games')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          games = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      games.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/games', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/games')
        .send({
          name: 'New Game',
          info: 'This is the brand new game!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGame = res.body;
          done();
        });
    });

    it('should respond with the newly created game', function() {
      newGame.name.should.equal('New Game');
      newGame.info.should.equal('This is the brand new game!!!');
    });
  });

  describe('GET /api/games/:id', function() {
    var game;

    beforeEach(function(done) {
      request(app)
        .get(`/api/games/${newGame._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          game = res.body;
          done();
        });
    });

    afterEach(function() {
      game = {};
    });

    it('should respond with the requested game', function() {
      game.name.should.equal('New Game');
      game.info.should.equal('This is the brand new game!!!');
    });
  });

  describe('PUT /api/games/:id', function() {
    var updatedGame;

    beforeEach(function(done) {
      request(app)
        .put(`/api/games/${newGame._id}`)
        .send({
          name: 'Updated Game',
          info: 'This is the updated game!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGame = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGame = {};
    });

    it('should respond with the updated game', function() {
      updatedGame.name.should.equal('Updated Game');
      updatedGame.info.should.equal('This is the updated game!!!');
    });

    it('should respond with the updated game on a subsequent GET', function(done) {
      request(app)
        .get(`/api/games/${newGame._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let game = res.body;

          game.name.should.equal('Updated Game');
          game.info.should.equal('This is the updated game!!!');

          done();
        });
    });
  });

  describe('PATCH /api/games/:id', function() {
    var patchedGame;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/games/${newGame._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Game' },
          { op: 'replace', path: '/info', value: 'This is the patched game!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGame = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGame = {};
    });

    it('should respond with the patched game', function() {
      patchedGame.name.should.equal('Patched Game');
      patchedGame.info.should.equal('This is the patched game!!!');
    });
  });

  describe('DELETE /api/games/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/games/${newGame._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when game does not exist', function(done) {
      request(app)
        .delete(`/api/games/${newGame._id}`)
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
