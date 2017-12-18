'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var awardCtrlStub = {
  index:  'awardCtrl.index',
  show:   'awardCtrl.show',
  create: 'awardCtrl.create',
  upsert: 'awardCtrl.upsert',
  destroy:'awardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var awardIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './award.controller': awardCtrlStub
});

describe('Award API Router:', function() {
  it('should return an express router instance', function() {
    awardIndex.should.equal(routerStub);
  });



  describe('GET /api/awards', function() {
    it('should route to award.controller.index', function() {
      routerStub.get
        .withArgs('/', 'awardCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/awards/user', function() {
    it('should route to award.controller.userAwards', function() {
      routerStub.get
        .withArgs('/', 'awardCtrl.userAwards')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/awards/user/badge/:id', function() {
    it('should route to award.controller.awards', function() {
      routerStub.get
        .withArgs('/:id', 'awardCtrl.awards')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/awards/:id', function() {
    it('should route to award.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'awardCtrl.show')
        .should.have.been.calledOnce;
    });
  });


  describe('POST /api/awards/create', function() {
    it('should route to award.controller.create', function() {
      routerStub.post
        .withArgs('/', 'awardCtrl.create')
        .should.have.been.calledOnce;
    });
  });



  describe('PUT /api/awards/:id', function() {
    it('should route to award.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'awardCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

 

  describe('DELETE /api/awards/:id', function() {
    it('should route to award.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'awardCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
