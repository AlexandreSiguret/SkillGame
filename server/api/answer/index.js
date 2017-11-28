'use strict';

import * as auth from '../../auth/auth.service';
var express = require('express');
var controller = require('./answer.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();
/*** GET ***/

/**
* @api {get} /answers  Read data of all Answer 
* 
* @apiName controller.index
* @apiGroup Answer
* @apiPermission none
*

*@apiSuccess {Number} _id  id of an Answer.
*@apiSuccess {Number} UserId  id of the user who do the answer.
*@apiSuccess {Number} earnedPoint point win with this question.
*@apiSuccess {Number} GameId the id of the game who the Answer comes.
*@apiSuccess {Number} QuestionId the id of the question
*@apiSuccess {Number} ChoiceId the id of the choice choose by the player


*/

router.get('/', controller.index);


router.get("/myanswer/:id" / controller.myanswer);
/**
 * @api {get} /answers/pickone/:idgame  pick one question in a game
 * 
 *@apiName controller.myanswer
 *@apiDescription pick randomly one question among the question in the games
 *@apiGroup Answer
 *@apiPermission none
 *@apiSuccess {Number} _id  id of an Answer.
 *@apiSuccess {Number} UserId  id of the user who do the answer.
 *@apiSuccess {Number} earnedPoint point win with this question.
 *@apiSuccess {Number} GameId the id of the game who the Answer comes.
 *@apiSuccess {Number} QuestionId the id of the question
 *@apiSuccess {Number} ChoiceId the id of the choice choose by the player
 * 
 *
 * 

 */
router.get("/pickone/:id", auth.isAuthenticated(), controller.one)

/**
 * @api {get} /answers/:id  get the data of one question in a game
 * 
 * @apiName controller.show
 * @apiGroup Answer
 * @apiPermission none
 * @apiSuccess {Number} _id  id of an Answer.
 * @apiSuccess {Number} UserId  id of the user who do the answer.
 * @apiSuccess {Number} earnedPoint point win with this question.
 * @apiSuccess {Number} GameId the id of the game who the Answer comes.
 * @apiSuccess {Number} QuestionId the id of the question
 * @apiSuccess {Number} ChoiceId the id of the choice choose by the player
 * 
 *
 * 

 */

router.get('/:id', controller.show);

//*** POST  ***/

/**
* @api {post} /answers  Create an Answer 
* 
* @apiDescription Creates a new Answer in the DB
* @apiName Controller.create
* @apiGroup Answer
* @apiPermission Authentification
* @apiSuccess  {Number} id  The new Answer-ID.
* 
* 

*/

router.post('/', controller.create);

//*** PUT ***/

/**
* @api {put} /answers/:id  Change a Answer 
* 
* @apiName controller.upsert
* @apiDescription Modify  an answer

* @apiGroup Answer
* @apiPermission none
*
* @apiParam {id} id {get} ID of the answer
* 

*
* 
*/
router.put('/:id', controller.upsert);


router.patch('/:id', controller.patch);

/*** DELETE ***/
/**
* @api {delete} /answers/:id  delete a Answer 
* 
* @apiName controller.destroy
* @apiGroup Answer
* @apiPermission Admin 
* @apiParam {id} id {get} ID of the answer
*
* 
*/
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
