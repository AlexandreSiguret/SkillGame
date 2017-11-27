'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var scoreCtrlStub = {
  index: 'scoreCtrl.index',
  show: 'scoreCtrl.show',
  create: 'scoreCtrl.create',
  upsert: 'scoreCtrl.upsert',
  patch: 'scoreCtrl.patch',
  destroy: 'scoreCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var scoreIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './score.controller': scoreCtrlStub
});

describe('Score API Router:', function() {
  it('should return an express router instance', function() {
    scoreIndex.should.equal(routerStub);
  });

  describe('GET /api/scores', function() {
    it('should route to score.controller.index', function() {
      routerStub.get
        .withArgs('/', 'scoreCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/scores/:id', function() {
    it('should route to score.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'scoreCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/scores', function() {
    it('should route to score.controller.create', function() {
      routerStub.post
        .withArgs('/', 'scoreCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/scores/:id', function() {
    it('should route to score.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'scoreCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/scores/:id', function() {
    it('should route to score.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'scoreCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/scores/:id', function() {
    it('should route to score.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'scoreCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
