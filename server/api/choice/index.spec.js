'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var choiceCtrlStub = {
  index: 'choiceCtrl.index',
  show: 'choiceCtrl.show',
  create: 'choiceCtrl.create',
  upsert: 'choiceCtrl.upsert',
  patch: 'choiceCtrl.patch',
  destroy: 'choiceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var choiceIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './choice.controller': choiceCtrlStub
});

describe('Choice API Router:', function() {
  it('should return an express router instance', function() {
    choiceIndex.should.equal(routerStub);
  });



  describe('GET /api/choices', function() {
    it('should route to choice.controller.index', function() {
      routerStub.get
        .withArgs('/', 'choiceCtrl.index')
        .should.have.been.calledOnce;
    });
  });



  describe('GET /api/choices/:id', function() {
    it('should route to choice.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'choiceCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {post} /choices  Create a new Choice 
 * 
 * @apiName PostChoice
 * @apiGroup Choice
 * @apiPermission none
 *
 * @apiParam {Number} QuestionId ID of question.
 * @apiParam {String} statement Statement.
 *
 *@apiSuccess  {Number} id  The new Choice-ID.
 * 
 * @apiError ChoiceNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChoiceNameTooShort"
 *     }
 */

  describe('POST /api/choices', function() {
    it('should route to choice.controller.create', function() {
      routerStub.post
        .withArgs('/', 'choiceCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {put} /choices/:id  Change a Choice 
 * 
 * @apiName PutChoice 
 * @apiGroup Choice 
 * @apiPermission none
 *
 * @apiParam {Number} QuestionId ID of question.
 * @apiParam {String} statement Statement.
 *
 * 
 * @apiError ChoiceNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChoiceNameTooShort"
 *     }
 */

  describe('PUT /api/choices/:id', function() {
    it('should route to choice.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'choiceCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });


  /**
 * @api {patch} /choices/:id  Change a Choice 
 * 
 * @apiName PatchChoice
 * @apiGroup Choice
 * @apiPermission none
 *
 * @apiParam {Number} QuestionId ID of question.
 * @apiParam {String} statement Statement.
 *
 * 
 * @apiError ChoiceNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "ChoiceNameTooShort"
 *     }
 */

  describe('PATCH /api/choices/:id', function() {
    it('should route to choice.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'choiceCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

/**
 * @api {delete} /choices/:id  delete a Choice 
 * 
 * @apiName DeleteChoice
 * @apiGroup Choice
 * @apiPermission none
 *
 *
 * 
 * @apiError ChoiceNotFound The <code>id</code> of Choice was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ChoiceNotFound"
 *     }
 */

  describe('DELETE /api/choices/:id', function() {
    it('should route to choice.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'choiceCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
