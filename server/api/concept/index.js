'use strict';

var express = require('express');
var controller = require('./concept.controller');

var router = express.Router();

/**
 * @api {get} /concepts  Read data of Concept 
 * 
 * @apiName GetConcept
 * @apiGroup Concept
 * @apiPermission none
 *
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
router.get('/', controller.index);

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
router.get('/:id', controller.show);

/**
 * @api {post} /concepts  Create a new Concept 
 * 
 * @apiName PostConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 *@apiSuccess {String} name Name of the Concept.
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
router.post('/', controller.create);

 /**
 * @api {put} /concepts/:id  Change a Concept 
 * 
 * @apiName PutConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {Number} id Name Concept-ID.
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
router.put('/:id', controller.upsert);

/**
 * @api {patch} /concepts/:id  Change a Concept 
 * 
 * @apiName PatchConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {Number} id Concept-ID.
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
router.patch('/:id', controller.patch);

 /**
 * @api {delete} /concepts/:id  delete a Concept 
 * 
 * @apiName DeleteConcept
 * @apiGroup Concept
 * @apiPermission none
 *
 * @apiParam {Number} id Concept-ID.
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
router.delete('/:id', controller.destroy);

module.exports = router;
