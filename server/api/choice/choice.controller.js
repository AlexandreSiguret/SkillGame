/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/choices              ->  index
 * POST    /api/choices              ->  create
 * GET     /api/choices/:id          ->  show
 * PUT     /api/choices/:id          ->  upsert
 * PATCH   /api/choices/:id          ->  patch
 * DELETE  /api/choices/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Choice} from '../../sqldb';
import db from "../../sqldb"
import Sequelize from 'sequelize';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
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

// Gets a list of Choices
export function index(req, res) {
  return Choice.findAll({
    include : [
      {model :db.Question,
      attributes : ["question"]}
    ]}
  )
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Choice from the DB
export function show(req, res) {
  return Choice.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function question(req,res){
  console.log("on m appelle")
  return Choice.findAll({
    order: Sequelize.fn('RANDOM'),
    where : {
      QuestionId : req.params.id
    }
  }).then(respondWithResult(res))
}

// Creates a new Choice in the DB
export function create(req, res) {
  return Choice.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Choice in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Choice.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Choice in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Choice.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Choice from the DB
export function destroy(req, res) {
  return Choice.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
