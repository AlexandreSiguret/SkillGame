'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var conceptCtrlStub = {
  index: 'conceptCtrl.index',
  show: 'conceptCtrl.show',
  create: 'conceptCtrl.create',
  upsert: 'conceptCtrl.upsert',
  patch: 'conceptCtrl.patch',
  destroy: 'conceptCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var conceptIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './concept.controller': conceptCtrlStub
});

describe('Concept API Router:', function() {
  it('should return an express router instance', function() {
    conceptIndex.should.equal(routerStub);
  });

  describe('GET /api/concepts', function() {
    it('should route to concept.controller.index', function() {
      routerStub.get
        .withArgs('/', 'conceptCtrl.index')
        .should.have.been.calledOnce;
    });
  });
  
  /**
 * @api {get} /concepts/:id Request Concept information
 * @apiName GetConcept
 * @apiGroup Concept
 *
 * @apiParam {Number} Concepts unique ID.
 *
 * @apiSuccess {String} name  name of the Concept.
 */

  describe('GET /api/concepts/:id', function() {
    it('should route to concept.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'conceptCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/concepts', function() {
    it('should route to concept.controller.create', function() {
      routerStub.post
        .withArgs('/', 'conceptCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/concepts/:id', function() {
    it('should route to concept.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'conceptCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/concepts/:id', function() {
    it('should route to concept.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'conceptCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/concepts/:id', function() {
    it('should route to concept.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'conceptCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
