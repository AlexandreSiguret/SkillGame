'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var badgeCtrlStub = {
  index: 'badgeCtrl.index',
  show: 'badgeCtrl.show',
  create: 'badgeCtrl.create',
  upsert: 'badgeCtrl.upsert',
  patch: 'badgeCtrl.patch',
  destroy: 'badgeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var badgeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './badge.controller': badgeCtrlStub
});

describe('Badge API Router:', function() {
  it('should return an express router instance', function() {
    badgeIndex.should.equal(routerStub);
  });

  describe('GET /yes', function() {
    it('should route to badge.controller.index', function() {
      routerStub.get
        .withArgs('/', 'badgeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /yes/:id', function() {
    it('should route to badge.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'badgeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /yes', function() {
    it('should route to badge.controller.create', function() {
      routerStub.post
        .withArgs('/', 'badgeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /yes/:id', function() {
    it('should route to badge.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'badgeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /yes/:id', function() {
    it('should route to badge.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'badgeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /yes/:id', function() {
    it('should route to badge.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'badgeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
