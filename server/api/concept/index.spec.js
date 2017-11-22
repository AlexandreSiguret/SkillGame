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

  /**
 * @api {get} /concepts  Read data of Concept 
 * 
 * @apiName GetConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {String} name Name of the Concept.
 *
 *@apiSuccess  {Number} id  The new Concept-ID.
 * 
 * @apiError ConceptNotFound The <code>id</code> of the User was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ConceptNotFound"
 *     }
 */

  describe('GET /api/concepts', function() {
    it('should route to concept.controller.index', function() {
      routerStub.get
        .withArgs('/', 'conceptCtrl.index')
        .should.have.been.calledOnce;
    });
  });
  
  /**
 * @api {get} /concepts/:id Read data of Concept by id
 * 
 * @apiName GetConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {Number} id unique ID.
 *
 * @apiSuccess  {Number} id  ID of the Concept.
 * @apiSuccess  {String} name  name of the Concept.
 * 
 * @apiError ConceptNotFound The <code>id</code> of the Concept was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ConceptNotFound"
 *     }
 */

  describe('GET /api/concepts/:id', function() {
    it('should route to concept.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'conceptCtrl.show')
        .should.have.been.calledOnce;
    });
  });

/**
 * @api {post} /concepts  Create a new Concept 
 * 
 * @apiName PostConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {String} name Name of the Concept.
 *
 *@apiSuccess  {Number} id  The new Concept-ID.
 * 
 * @apiError ConceptNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ConceptNameTooShort"
 *     }
 */
 

  describe('POST /api/concepts', function() {
    it('should route to concept.controller.create', function() {
      routerStub.post
        .withArgs('/', 'conceptCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {put} /concepts/:id  Change a Concept 
 * 
 * @apiName PutConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {String} name Name of the Concept.
 *
 * 
 * @apiError ConceptNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ConceptNameTooShort"
 *     }
 */

  describe('PUT /api/concepts/:id', function() {
    it('should route to concept.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'conceptCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });
  
  
  /**
 * @api {patch} /concepts/:id  Change a Concept 
 * 
 * @apiName PatchConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {String} name Name of the Concept.
 *
 * 
 * @apiError ConceptNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ConceptNameTooShort"
 *     }
 */
 
  describe('PATCH /api/concepts/:id', function() {
    it('should route to concept.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'conceptCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  
 /**
 * @api {delete} /concepts/:id  delete a Concept 
 * 
 * @apiName DeleteConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {String} name Name of the Concept.
 *
 * 
 * @apiError ConceptNotFound The <code>id</code> of the Concept was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ConceptNotFound"
 *     }
 */
  describe('DELETE /api/concepts/:id', function() {
    it('should route to concept.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'conceptCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
