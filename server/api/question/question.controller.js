/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questions              ->  index
 * GET     /api/questions/random       ->  concept
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  upsert
 * PATCH   /api/questions/:id          ->  patch
 * DELETE  /api/questions/:id          ->  destroy
 */


'use strict';

import jsonpatch from 'fast-json-patch';
import {Question} from '../../sqldb';
import Sequelize from 'sequelize';
import db from "../../sqldb"

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



// Gets a list of Questions
export function index(req, res) {
  return Question.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//gets the list of Question for a concept

export function concept(req,res){
  return Question.findAll({
    where :{
      concept : req.params.id 
    }
  }) .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

//gets a Question for a concept (Take question)

export function takequest(req, res){
  console.log("ma route");
  return Question.findAll({
    where: {
      ConceptId : req.params.id
    }
  }) 
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}



 
//gets a random Question for a concept

export function random(req,res){
   
return  Question.findAll({ 
    order :Sequelize.fn( 'RANDOM' ) ,    
    limit : 1
  })     
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res)); 
  
}


//gets the list of Question, created by a user
export function myquestion(req,res){
  var userId = req.user._id;

  return Question.findAll({
    include : db.Concept,
    where :{
      owner : userId
    }
  }).then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a single Question from the DB
export function show(req, res) {
  return Question.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Question in the DB
export function create(req, res) {
  req.body.owner = req.user._id
  return Question.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Question in the DB at the specified ID
export function upsert(req, res) {
 /*
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }*/

  return Question.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Question in the DB
export function patch(req, res) {
  
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Question.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Question from the DB
export function destroy(req, res) {
  return Question.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
