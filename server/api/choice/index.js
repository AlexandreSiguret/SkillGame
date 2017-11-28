'use strict';

var express = require('express');
var controller = require('./choice.controller');

var router = express.Router();

/*** GET */

  /**
 * @api {get} /choices All Choices 
 * 
 * @apiName controller.index
 * @apiDescription get all the choices
 * @apiGroup Choice
 * @apiPermission none
 *
 * @apiSuccess {Number} _id the ID of one choice.
 * @apiSuccess {String} statement this content.
 * @apiSuccess {Number} Questionid the ID of the question who have this choice.
 * 
 * 

 */

router.get('/', controller.index);
  /**
 * @api {get} /choices Choices for one Question
 * 
 * @apiName controller.question
 * @apiDescription gives the four choices for one question
 * @apiGroup Choice
 * @apiPermission none
 *
 * @apiSuccess {Number} _id the ID of one choice.
 * @apiSuccess {String} statement this content.
 * @apiSuccess {Number} Questionid the ID of the question who have this choice.
 * 

 */

router.get("/question/:id",controller.question)
  /**
 * @api {get} /choices Choices for one Question
 * 
 * @apiName controller.show
 * @apiDescription give the choice who have this id
 * @apiGroup Choice
 * @apiPermission none
 *
 * @apiParam {Number} id choice id what you want
 * 
 * @apiSuccess {Number} _id the ID of the choice.
 * @apiSuccess {String} statement this content.
 * @apiSuccess {Number} Questionid the ID of the question who have this choice.
 * 

 */

router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
