'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var quelqueendpointCtrlStub = {
  index: 'quelqueendpointCtrl.index',
  show: 'quelqueendpointCtrl.show',
  create: 'quelqueendpointCtrl.create',
  upsert: 'quelqueendpointCtrl.upsert',
  patch: 'quelqueendpointCtrl.patch',
  destroy: 'quelqueendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var quelqueendpointIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './quelqueendpoint.controller': quelqueendpointCtrlStub
});

describe('Quelqueendpoint API Router:', function() {
  it('should return an express router instance', function() {
    quelqueendpointIndex.should.equal(routerStub);
  });

  describe('GET /api/quelqueendpoints', function() {
    it('should route to quelqueendpoint.controller.index', function() {
      routerStub.get
        .withArgs('/', 'quelqueendpointCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/quelqueendpoints/:id', function() {
    it('should route to quelqueendpoint.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'quelqueendpointCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/quelqueendpoints', function() {
    it('should route to quelqueendpoint.controller.create', function() {
      routerStub.post
        .withArgs('/', 'quelqueendpointCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/quelqueendpoints/:id', function() {
    it('should route to quelqueendpoint.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'quelqueendpointCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/quelqueendpoints/:id', function() {
    it('should route to quelqueendpoint.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'quelqueendpointCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/quelqueendpoints/:id', function() {
    it('should route to quelqueendpoint.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'quelqueendpointCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
