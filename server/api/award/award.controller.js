/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/awards              ->  index
 * POST    /api/awards              ->  create
 * GET     /api/awards/:id          ->  awards      by user Id
 * GET     /api/awards/by/:id       ->  show        by id
 * DELETE  /api/awards/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Award} from '../../sqldb';
import config from '../../config/environment';
import Sequelize from 'sequelize';
import db from '../../sqldb';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of All awards
export function index(req, res) {

  return Award.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get a list of my awards
export function awards(req, res) {
  
  return Award.findAll({

    attributes: [
//      [Sequelize.fn('COUNT', Sequelize.col('Award._id') ), 'count'],
      '_id',
      'UserId',
      'ConceptId',
      'BadgeId',
      'badgeCount',
      'date'
    ], 
    where : [{
      UserId : req.params.uId
    }, {
      ConceptId: req.params.cId
    }, {
      BadgeId: req.params.bId
    }],
//    group: [ 'UserId', 'ConceptId', 'BadgeId'],
    order : [ [ 'date','ASC'] ],
    include: [{
      model: db.User,      
    }, {
      model: db.Concept,
    }, {
      model: db.Badge,
    }] 

  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get a list of awards by userId
export function userAwards(req, res) {
   
  return Award.findAll({
    attributes: [
      '_id',
      'UserId',
      'ConceptId',
      'BadgeId',
      'badgeCount',
      'date'
    ], 
    where : [{
      UserId : req.params.id
    }],
    order : [ [ 'date','DESC'] ],
    include: [{
      model: db.User,      
    }, {
      model: db.Concept,
    }, {
      model: db.Badge,
    }] 

  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Get a award  by id from the DB
export function show(req, res) {
  return Award.findAll({
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing award in the DB
export function patch(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Award.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Upserts the given Award in the DB at the specified ID
export function upsert(req, res) {
 // req.body.UserId = req.user._id 
  
  return Award.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  }).then(regularisation(req.params.id,req.user._id))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


/**
 * Creates a new award
 */
export function create(req, res) {
  var newAward = Award.build(req.body);
  return newAward.save()
    .catch(validationError(res));
}


// Deletes a Award from the DB
export function destroy(req, res) {
  return Award.find({
    where: {
      _id: req.params.id
    }
  })
    .then(removeEntity(res))
    .catch(handleError(res));
}
