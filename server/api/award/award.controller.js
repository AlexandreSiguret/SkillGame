/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/awards              ->  index
 * POST    /api/awards              ->  create
 * GET     /api/awards/:id          ->  awards by user Id
 * GET     /api/awards/by/:id       ->  show awards by id
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

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}



function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
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
  
  return Award.find({

    attributes: [
      "_id",
      'BadgeId',
      'badgeCount'
    ], 
    where : [{
      UserId : req.user._id
    }, {
      BadgeId: req.params.bId
    }],
    include: [{
      model: db.Badge,
      attributes: ['_id','name','picture', 'description']
    }] 

  })
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Get a list of awards by userId
export function userAwards(req, res) {
   
  return Award.findAll({
    attributes: [
      'badgeCount'
    ], 
    where : [{
      UserId : req.user._id
    }],
    include: [{
      model: db.Badge,
      attributes: ['_id','name','picture','description']
    }] 

  }).then(respondWithResult(res))
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

  
  return Award.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })  
    .then(res.status(204).end())
    .catch(handleError(res));
}


/**
 * Creates a new award
 */
export function create(req, res) {
  req.body.UserId = req.user._id
  return Award.create(req.body)
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
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
