'use strict';

var express = require('express');
var controller = require('./question.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

/**
 * @api {get} /questions  Read data of Question 
 * 
 * @apiName GetQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiSuccess {Number} id              The new Question-ID.
 * @apiSuccess {String} question        contains of the question.
 * @apiSuccess {Number} owner           The owner-ID of question.
 * @apiSuccess {Number} nbAppearance    number of appearances.
 * @apiSuccess {Number} nbContestation  number of protest.
 * @apiSuccess {Number} concept         The concept-ID.
 * @apiSuccess {String} goodAnswer      Good Answer.
 * 
 * 
 * @apiError QuestionNotFound The <code>id</code> of the AQuestion was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "QuestionNotFound"
 *     }
 */
router.get('/', controller.index);

/**
 * @api {get} /questions/myquestion  Read data of Question 
 * 
 * @apiName GetQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiParam {String} myquestion  My question.
 * 
 * @apiSuccess {Number} id              The new Question-ID.
 * @apiSuccess {String} question        contains of the question.
 * @apiSuccess {Number} owner           The owner-ID of question.
 * @apiSuccess {Number} nbAppearance    number of appearances.
 * @apiSuccess {Number} nbContestation  number of protest.
 * @apiSuccess {Number} concept         The concept-ID.
 * @apiSuccess {String} goodAnswer      Good Answer.
 * 
 * 
 * @apiError QuestionNotFound The <code>id</code> of the AQuestion was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "QuestionNotFound"
 *     }
 */
router.get("/myquestion", auth.isAuthenticated(),controller.myquestion);

/**
 * @api {get} /questions/random/:id  Read data of Question 
 * 
 * @apiName GetQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiParam {Number} id  The new Question-ID.
 * @apiParam {String} random  random.
 * 
 * @apiSuccess {Number} id              The new Question-ID.
 * @apiSuccess {String} question        contains of the question.
 * @apiSuccess {Number} owner           The owner-ID of question.
 * @apiSuccess {Number} nbAppearance    number of appearances.
 * @apiSuccess {Number} nbContestation  number of protest.
 * @apiSuccess {Number} concept         The concept-ID.
 * @apiSuccess {String} goodAnswer      Good Answer.
 * 
 * 
 * @apiError QuestionNotFound The <code>id</code> of the AQuestion was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "QuestionNotFound"
 *     }
 */
router.get('/random/:id',controller.random);

 /**
 * @api {get} /questions/:id Read data of Question by id
 * 
 * @apiName GetQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiParam  {Number} id  The new Question-ID.
 * 
 * @apiSuccess {String} question         contains of the question.
 * @apiSuccess {Number} owner            The owner-ID of question.
 * @apiSuccess {Number} nbAppearance     number of appearances.
 * @apiSuccess {Number} nbContestation   number of protest.
 * @apiSuccess {Number} concept          The concept-ID.
 * @apiSuccess {String} goodAnswer       Good Answer.
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
router.get('/:id', controller.show);

router.get('/takequest/:id', controller.takequest);

 /**
 * @api {post} /questions  Create a new Question 
 * 
 * @apiName PostQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiSuccess {Number} id               The new Question-ID.
 * @apiSuccess {String} question         contains of the question.
 * @apiSuccess {Number} owner            The owner-ID of question.
 * @apiSuccess {Number} nbAppearance     number of appearances.
 * @apiSuccess {Number} nbContestation   number of protest.
 * @apiSuccess {Number} concept          The concept-ID.
 * @apiSuccess {String} goodAnswer       Good Answer.
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
router.post('/',auth.isAuthenticated(), controller.create);

/**
 * @api {put} /questions/:id  Change a Question 
 * 
 * @apiName PutQuestion
 * @apiGroup Question
 * @apiPermission none
 * 
 * @apiParam {Number} id               The new Question-ID.
 *
 * @apiSuccess {String} question       contains of the question.
 * @apiSuccess {Number} owner          The owner-ID of question.
 * @apiSuccess {Number} nbAppearance   number of appearances.
 * @apiSuccess {Number} nbContestation number of protest.
 * @apiSuccess {Number} concept        The concept-ID.
 * @apiSuccess {String} goodAnswer     Good Answer.
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
router.put('/:id', controller.upsert);

/**
 * @api {patch} /questions/:id  Change a Question 
 * 
 * @apiName PatchQuestion 
 * @apiGroup Question 
 * @apiPermission none
 *
 * @apiParam {Number} id               The new Question-ID.
 * 
 * @apiSuccess {String} question       contains of the question.
 * @apiSuccess {Number} owner          The owner-ID of question.
 * @apiSuccess {Number} nbAppearance   number of appearances.
 * @apiSuccess {Number} nbContestation number of protest.
 * @apiSuccess {Number} concept        The concept-ID.
 * @apiSuccess {String} goodAnswer     Good Answer.
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
router.patch('/:id', controller.patch);

/**
 * @api {delete} /questions/:id  delete a Question 
 * 
 * @apiName DeleteQuestion
 * @apiGroup Question
 * @apiPermission none
 *
 * @apiParam {Number} id  The new Question-ID.
 * 
 * @apiError QuestionNotFound The <code>id</code> of the Question was not found.
 * 
 *  @apiErrorExample {json} Error-Response(exemple):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "QuestionNotFound"
 *     }
 */
router.delete('/:id', controller.destroy);

module.exports = router;
