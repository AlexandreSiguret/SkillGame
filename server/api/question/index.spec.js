'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var questionCtrlStub = {
  index: 'questionCtrl.index',
  show: 'questionCtrl.show',
  create: 'questionCtrl.create',
  upsert: 'questionCtrl.upsert',
  patch: 'questionCtrl.patch',
  destroy: 'questionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var questionIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './question.controller': questionCtrlStub
});

describe('Question API Router:', function() {
  it('should return an express router instance', function() {
    questionIndex.should.equal(routerStub);
  });

/**
 * @api {get} /questions  Read data of Question 
 * 
 * @apiName GetQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiParam {String} question  contains of the question.
 * @apiParam {Number} owner            The owner-ID of question.
 * @apiParam {Number} nbAppearance            number of appearances.
 * @apiParam {Number} nbContestation    number of protest.
 * @apiParam {Number} concept            The concept-ID.
 * @apiParam {String} goodAnswer  Good Answer.
 * 
 *@apiSuccess  {Number} id  The new Question-ID.
 * 
 * @apiError QuestionNotFound The <code>id</code> of the AQuestion was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "QuestionNotFound"
 *     }
 */

  describe('GET /api/questions', function() {
    it('should route to question.controller.index', function() {
      routerStub.get
        .withArgs('/', 'questionCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {get} /questions/:id Read data of Question by id
 * 
 * @apiName GetQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiParam {String} question  contains of the question.
 * @apiParam {Number} owner            The owner-ID of question.
 * @apiParam {Number} nbAppearance            number of appearances.
 * @apiParam {Number} nbContestation    number of protest.
 * @apiParam {Number} concept            The concept-ID.
 * @apiParam {String} goodAnswer  Good Answer.
 * 
 *@apiSuccess  {Number} id  The new Question-ID.
 * 
 * @apiError QuestionNotFound The <code>id</code> of the Question was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "QuestionNotFound"
 *     }
 */

  
  describe('GET /api/questions/:id', function() {
    it('should route to question.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'questionCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {post} /questions  Create a new Question 
 * 
 * @apiName PostQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiParam {String} question  contains of the question.
 * @apiParam {Number} owner            The owner-ID of question.
 * @apiParam {Number} nbAppearance            number of appearances.
 * @apiParam {Number} nbContestation    number of protest.
 * @apiParam {Number} concept            The concept-ID.
 * @apiParam {String} goodAnswer  Good Answer.
 * 
 *@apiSuccess  {Number} id  The new Question-ID.
 * 
 * @apiError QuestionNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "QuestionNameTooShort"
 *     }
 */
 

  describe('POST /api/questions', function() {
    it('should route to question.controller.create', function() {
      routerStub.post
        .withArgs('/', 'questionCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {put} /questions/:id  Change a Question 
 * 
 * @apiName PutQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiParam {String} question  contains of the question.
 * @apiParam {Number} owner            The owner-ID of question.
 * @apiParam {Number} nbAppearance            number of appearances.
 * @apiParam {Number} nbContestation    number of protest.
 * @apiParam {Number} concept            The concept-ID.
 * @apiParam {String} goodAnswer  Good Answer.
 *
 * 
 * @apiError QuestionNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "QuestionNameTooShort"
 *     }
 */

  describe('PUT /api/questions/:id', function() {
    it('should route to question.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'questionCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

/**
 * @api {patch} /questions/:id  Change a Question 
 * 
 * @apiName PatchQuestion 
 * @apiGroup Question 
 * @apiPermission none
 *
 * @apiParam {String} question  contains of the question.
 * @apiParam {Number} owner            The owner-ID of question.
 * @apiParam {Number} nbAppearance            number of appearances.
 * @apiParam {Number} nbContestation    number of protest.
 * @apiParam {Number} concept            The concept-ID.
 * @apiParam {String} goodAnswer  Good Answer.
 *
 * 
 * @apiError QuestionNotFound Minimum of 5 characters required.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "QuestionNameTooShort"
 *     }
 */

  describe('PATCH /api/questions/:id', function() {
    it('should route to question.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'questionCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {delete} /questions/:id  delete a Question 
 * 
 * @apiName DeleteQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 *
 * 
 * @apiError QuestionNotFound The <code>id</code> of the Question was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "QuestionNotFound"
 *     }
 */

  describe('DELETE /api/questions/:id', function() {
    it('should route to question.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'questionCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
