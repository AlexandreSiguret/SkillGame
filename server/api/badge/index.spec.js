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

  /**
 * @api {get} /yes  Read data of Badge
 * 
 * @apiName GetBadge
 * @apiGroup Badge
 * @apiPermission none
 *
 * @apiParam {String} picture Picture of badge.
 * @apiParam {String} description Description of badge.
 * 
 *@apiSuccess  {Number} id  The new Badge-ID.
 * 
 * @apiError BadgeNotFound The <code>id</code> of the Badge was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BadgeNotFound"
 *     }
 */

  describe('GET /yes', function() {
    it('should route to badge.controller.index', function() {
      routerStub.get
        .withArgs('/', 'badgeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {get} /yes/:id Read data of Badge by id
 * 
 * @apiName GetBadge
 * @apiGroup Badge
 * @apiPermission none
 *
 * @apiParam {String} picture Picture of badge.
 * @apiParam {String} description Description of badge.
 * 
 *@apiSuccess  {Number} id  The new Badge-ID.
 * 
 * @apiError BadgeNotFound The <code>id</code> of the Badge was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BadgeNotFound"
 *     }
 */

  describe('GET /yes/:id', function() {
    it('should route to badge.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'badgeCtrl.show')
        .should.have.been.calledOnce;
    });
  });


  /**
 * @api {post} /yes  Create a new Badge
 * 
 * @apiName PostBadge
 * @apiGroup Badge
 * @apiPermission none
 *
 * @apiParam {String} picture Picture of badge.
 * @apiParam {String} description Description of badge.
 *
 *@apiSuccess  {Number} id  The new Badge-ID.
 * 
 * @apiError BadgeNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "BadgeNameTooShort"
 *     }
 */
  describe('POST /yes', function() {
    it('should route to badge.controller.create', function() {
      routerStub.post
        .withArgs('/', 'badgeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {put} /yes/:id  Change a Badge 
 * 
 * @apiName PutBadge 
 * @apiGroup Badge 
 * @apiPermission none
 *
 * @apiParam {String} picture Picture of badge.
 * @apiParam {String} description Description of badge.
 *
 * 
 * @apiError BadgeNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "BadgeeNameTooShort"
 *     }
 */

  describe('PUT /yes/:id', function() {
    it('should route to badge.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'badgeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

/**
 * @api {patch} /yes/:id  Change a Badge 
 * 
 * @apiName PatchBadge
 * @apiGroup Badge
 * @apiPermission none
 *
 * @apiParam {String} picture Picture of badge.
 * @apiParam {String} description Description of badge.
 *
 * 
 * @apiError BadgeNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "BadgeNameTooShort"
 *     }
 */

  describe('PATCH /yes/:id', function() {
    it('should route to badge.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'badgeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

/**
 * @api {delete} /yes/:id  delete a Badge
 * 
 * @apiName DeleteBadge
 * @apiGroup Badge
 * @apiPermission none
 *
 *
 * 
 * @apiError BadgeNotFound The <code>id</code> of Badge was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "BadgeNotFound"
 *     }
 */

  describe('DELETE /yes/:id', function() {
    it('should route to badge.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'badgeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
