/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/scores              ->  index
 * POST    /api/scores              ->  create
 * GET     /api/scores/:id          ->  show
 * PUT     /api/scores/:id          ->  upsert
 * PATCH   /api/scores/:id          ->  patch
 * DELETE  /api/scores/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Score} from '../../sqldb';
import Sequelize from 'sequelize';
import db from '../../sqldb';

function respondWithResult(res, statusCode) { 
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

// gets tree top score
export function topthree(req,res){ 
  
  var cId = req.params.id;
  return Score.findAll({
    where: { 
      ConceptId: cId,
    },
    order: [
      ['score','DESC'], 
      ['UserId','ASC']
    ],
    limit: 3,

    include: [{
      model: db.User,      
      attributes: ['name','avatar']
    }] 
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
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

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) { 
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Scores
export function index(req, res) {   
  return Score.findAll({
    attributes: [[Sequelize.fn('SUM', Sequelize.col('score')), 'total'],"_id","UserId"],
    group: 'UserId',
    order : [
      [ Sequelize.col('total'),"DESC"]
 //     ["UserId","ASC"]
    ],
    limit : 3,
    include: [{
          model: db.User,      
          attributes : ["name","avatar"]
      }]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Score from the DB
export function show(req, res) {
  return Score.find({
    where: {
      UserId: req.user._id,
      ConceptId: req.params.id 
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Score in the DB
export function create(req, res) {
  req.body.UserId = req.user._id 
  return Score.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Score in the DB at the specified ID
export function upsert(req, res) {
  /*if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }*/
  req.body.UserId = req.user._id 
  return Score.upsert(req.body, {

    where: {  
      _id: req.params.id,      

    }
  })
  .then(res.status(204).end())
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Score in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Score.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Score from the DB
export function destroy(req, res) {
  return Score.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
