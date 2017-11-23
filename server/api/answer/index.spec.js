'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var answerCtrlStub = {
  index: 'answerCtrl.index',
  show: 'answerCtrl.show',
  create: 'answerCtrl.create',
  upsert: 'answerCtrl.upsert',
  patch: 'answerCtrl.patch',
  destroy: 'answerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var answerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './answer.controller': answerCtrlStub
});

describe('Answer API Router:', function() {
  it('should return an express router instance', function() {
    answerIndex.should.equal(routerStub);
  });

   /**
 * @api {get} /answers  Read data of Answer 
 * 
 * @apiName GetAnswer
 * @apiGroup Answer
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Answer.
 * @apiParam {String} destinateur Destinateur of the Answer.
 * @apiParam {Number} msg_type Type of the Answer.
 * @apiParam {String} message Message of the Answer.
 * 
 *@apiSuccess  {Number} id  The new Answer-ID.
 * 
 * @apiError AnswerNotFound The <code>id</code> of the Answer was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "AnswerNotFound"
 *     }
 */

  describe('GET /api/answers', function() {
    it('should route to answer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'answerCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {get} /answers/:id Read data of answers by id
 * 
 * @apiName GetAnswer
 * @apiGroup Answer
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Answer.
 * @apiParam {String} destinateur Destinateur of the Answer.
 * @apiParam {Number} msg_type Type of the Answer.
 * @apiParam {String} message Message of the Answer.
 * 
 *@apiSuccess  {Number} id  The new Answer-ID.
 * 
 * @apiError AnswerNotFound The <code>id</code> of the Answer was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "AnswerNotFound"
 *     }
 */

  describe('GET /api/answers/:id', function() {
    it('should route to answer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'answerCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {post} /answers  Create a new Answer 
 * 
 * @apiName PostAnswer
 * @apiGroup Answer
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Answer.
 * @apiParam {String} destinateur Destinateur of the Answer.
 * @apiParam {Number} msg_type Type of the Answer.
 * @apiParam {String} message Message of the Answer.
 *
 *@apiSuccess  {Number} id  The new Answer-ID.
 * 
 * @apiError AnswerNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AnswerNameTooShort"
 *     }
 */

  describe('POST /api/answers', function() {
    it('should route to answer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'answerCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {put} /answers/:id  Change a Answer 
 * 
 * @apiName PutAnswer
 * @apiGroup Answer
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Answer.
 * @apiParam {String} destinateur Destinateur of the Answer.
 * @apiParam {Number} msg_type Type of the Answer.
 * @apiParam {String} message Message of the Answer.
 *
 * 
 * @apiError AnswerNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AnswerNameTooShort"
 *     }
 */

  describe('PUT /api/answers/:id', function() {
    it('should route to answer.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'answerCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {patch} /answers/:id  Change a Answer 
 * 
 * @apiName PatchAnswer
 * @apiGroup Answer
 * @apiPermission none
 *
 * @apiParam {String} expediteur Expediteur of the Answer.
 * @apiParam {String} destinateur Destinateur of the Answer.
 * @apiParam {Number} msg_type Type of the Answer.
 * @apiParam {String} message Message of the Answer.
 *
 * 
 * @apiError AnswerNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AnswerNameTooShort"
 *     }
 */
  describe('PATCH /api/answers/:id', function() {
    it('should route to answer.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'answerCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {delete} /answers/:id  delete a Answer 
 * 
 * @apiName DeleteAnswer
 * @apiGroup Answer
 * @apiPermission none
 *
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

  describe('DELETE /api/answers/:id', function() {
    it('should route to answer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'answerCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
