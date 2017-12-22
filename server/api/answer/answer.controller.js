/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/answers              ->  index
 * POST    /api/answers              ->  create
 * GET     /api/answers/:id          ->  show
 * PUT     /api/answers/:id          ->  upsert
 * PATCH   /api/answers/:id          ->  patch
 * DELETE  /api/answers/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Answer} from '../../sqldb';
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

// Gets a list of Answers
export function index(req, res) {
  return Answer.findAll({
    include :[db.Question]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function one(req,res){
  console.log("coucou ici ")
  return Answer.findAll({
    order: Sequelize.fn('RANDOM'),
    limit : 1 ,
    include : {
      model: db.Question,
      attributes : ["_id","question"]
    },
    where : {
      GameId : req.params.id,
      UserId : req.user._id, 
      earnedPoint : null    
    },
    attributes : ["_id"]
  }
  
  ).then(respondWithResult(res))
}

export function all(req,res){
  console.log("coucou ici ")
  return Answer.findAll({
    order: Sequelize.fn('RANDOM'),
    limit : 1 ,
    include : {
      model: db.Question,
      attributes : ["_id","question"]
    },
    where : {
      GameId : req.params.id,
      //UserId : req.user._id, 
      earnedPoint : null    
    },
    attributes : ["_id"]
  }
  
  ).then(respondWithResult(res))
}

export function score(req,res){
  console.log("on passe dans la fonction")
 var tableau =  JSON.parse(req.params.tab)
 console.log(tableau)
  return Answer.findAll({
    where : {
      GameId : tableau
    },
    group : ["UserId", "GameId"],
    attributes : [[Sequelize.fn('SUM', Sequelize.col('earnedPoint') ), "score"],"UserId","GameId"]
  }).then(respondWithResult(res))
}

// Gets a single Answer from the DB
export function show(req, res) {
  return Answer.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Answer in the DB
export function create(req, res) {
  return Answer.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Answer in the DB at the specified ID
export function upsert(req, res) {
  console.log("ici put")
/*  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
*/


  return Answer.upsert(req.body, {
    
    where: {
      _id: req.params.id
    }
  }).then(res.status(204).end())
    .then(respondWithResult(res,201))
    .catch(handleError(res));
}

export function myanswer(req,res){
  var a = []
  console.log("on essaye de l'appeler")
  return Question.find({
    where : {
      QuestionId : req.params.id}
  }).then(succes =>{
    a.genial = succes
    console.log(a)
  })
}

// Updates an existing Answer in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Answer.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Answer from the DB
export function destroy(req, res) {
  return Answer.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
