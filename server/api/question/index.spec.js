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
 * @api {get} /questions Read data of questions 
 *
 *
 * @apiSuccess {Number}  id            The questions-ID.
 * @apiSuccess {String} question  contains of the question.
 * @apiSuccess {Number} owner            The owner-ID of question.
 * @apiSuccess {Number} nbAppearance            number of appearances.
 * @apiSuccess {Number} nbContestation    number of protest.
 * @apiSuccess {Number} concept            The concept-ID.
 * @apiSuccess {String} goodAnswer  Good Answer.
 */

  describe('GET /api/questions', function() {
    it('should route to question.controller.index', function() {
      routerStub.get
        .withArgs('/', 'questionCtrl.index')
        .should.have.been.calledOnce;
    });
  });

   /**
 * @api {get} /questions Read data of questions 
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Number}  id            The questions-ID.
 * @apiSuccess {String} question  contains of the question.
 * @apiSuccess {Number} owner            The owner-ID of question.
 * @apiSuccess {Number} nbAppearance            number of appearances.
 * @apiSuccess {Number} nbContestation    number of protest.
 * @apiSuccess {Number} concept            The concept-ID.
 * @apiSuccess {String} goodAnswer  Good Answer.
 *  
 * @apiError questionsNotFound   The <code>id</code> of the questions was not found.
 */
  describe('GET /api/questions/:id', function() {
    it('should route to question.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'questionCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {post} /user Create a new questions
 * @apiVersion 0.3.0
 * @apiName PostQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiDescription In this case "apiErrorStructure" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} question Contains of the Question.
 *
 * @apiSuccess {Number} id         The new Questions-ID.
 *
 * @apiUse CreateQuestionsError
 */

  describe('POST /api/questions', function() {
    it('should route to question.controller.create', function() {
      routerStub.post
        .withArgs('/', 'questionCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  /**
 * @api {put} /questions/:id Change a Questions
 * @apiVersion 0.3.0
 * @apiName PutQuestions
 * @apiGroup Questions
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /questions, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} question Contains of the Question.
 *
 * @apiUse CreateQuestionError
 */

  describe('PUT /api/questions/:id', function() {
    it('should route to question.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'questionCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/questions/:id', function() {
    it('should route to question.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'questionCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/questions/:id', function() {
    it('should route to question.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'questionCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
