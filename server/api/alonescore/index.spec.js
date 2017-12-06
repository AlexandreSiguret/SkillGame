'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var alonescoreCtrlStub = {
  index: 'alonescoreCtrl.index',
  show: 'alonescoreCtrl.show',
  create: 'alonescoreCtrl.create',
  upsert: 'alonescoreCtrl.upsert',
  patch: 'alonescoreCtrl.patch',
  destroy: 'alonescoreCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var alonescoreIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './alonescore.controller': alonescoreCtrlStub
});

describe('Alonescore API Router:', function() {
  it('should return an express router instance', function() {
    alonescoreIndex.should.equal(routerStub);
  });

  describe('GET /api/alonescores', function() {
    it('should route to alonescore.controller.index', function() {
      routerStub.get
        .withArgs('/', 'alonescoreCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/alonescores/:id', function() {
    it('should route to alonescore.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'alonescoreCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/alonescores', function() {
    it('should route to alonescore.controller.create', function() {
      routerStub.post
        .withArgs('/', 'alonescoreCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/alonescores/:id', function() {
    it('should route to alonescore.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'alonescoreCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/alonescores/:id', function() {
    it('should route to alonescore.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'alonescoreCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/alonescores/:id', function() {
    it('should route to alonescore.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'alonescoreCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
