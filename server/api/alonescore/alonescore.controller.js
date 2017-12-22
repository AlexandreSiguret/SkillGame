/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/alonescores              ->  index
 * POST    /api/alonescores              ->  create
 * GET     /api/alonescores/:id          ->  show
 * PUT     /api/alonescores/:id          ->  upsert
 * PATCH   /api/alonescores/:id          ->  patch
 * DELETE  /api/alonescores/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Alonescore} from '../../sqldb';
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

// gets three top of alonescore
export function three(req,res){ 
  return Alonescore.findAll({
    where: {
      ConceptId: req.params.id,
    },
    attributes: [[Sequelize.fn('max', Sequelize.col('alonescore')), 'alonescore'],"_id","UserId"],
    group: 'UserId',
    order: [
      [ Sequelize.col('alonescore'),"DESC"]
    ],
    group: 'UserId',
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

// Gets a list of Alonescores
export function index(req, res) {
  return Alonescore.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Alonescore from the DB
export function show(req, res) {
  return Alonescore.find({
    where: {
      UserId : req.user._id,
      ConceptId : req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Alonescore in the DB
export function create(req, res) {
  req.body.UserId = req.user._id
  return Alonescore.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Alonescore in the DB at the specified ID
export function upsert(req, res) {
  /*if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }*/
  // req.body.UserId = req.user._id
  return Alonescore.upsert(req.body, { 
    where: {
      ConceptId : req.params.id,
      // UserId : req.user._id
    }
  })
  .then(res.status(204).end())
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Alonescore in the DB   
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Alonescore.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Alonescore from the DB
export function destroy(req, res) {
  return Alonescore.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
