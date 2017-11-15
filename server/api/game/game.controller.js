/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/games              ->  index
 * POST    /api/games              ->  create
 * GET     /api/games/:id          ->  show
 * PUT     /api/games/:id          ->  upsert
 * PATCH   /api/games/:id          ->  patch
 * DELETE  /api/games/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Game} from '../../sqldb';
import config from '../../config/environment';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

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

// Gets a list of Games
export function index(req, res) {
  return Game.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function freeGame(req,res){
  
  return Game.findAll({
    where :{
      user1 : { $ne : req.user._id },
      concept : req.params.id,
      user2 : null
    },
    order :         Sequelize.fn('RANDOM')     
  }) .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}


export function game(req,res){
  var userId = req.user._id;
  console.log(userId);
  return Game.findAll({
    
    where :{
      user1 : req.user._id
    }
  }) .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a single Game from the DB
export function show(req, res) {
  return Game.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Game in the DB
export function create(req, res) {
  req.body.user1= req.user._id
  return Game.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Game in the DB at the specified ID
export function upsert(req, res) {
  req.body.user2 = req.user._id
  /*if(req.body._id) {
    console.log("on passe ici")
    Reflect.deleteProperty(req.body, '_id');
  }*/
  return Game.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Game in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Game.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Game from the DB
export function destroy(req, res) {
  return Game.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
