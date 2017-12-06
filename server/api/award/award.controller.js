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
import Badge from '../../sqldb';
import Concept from '../../sqldb';
import User from '../../sqldb';
import config from '../../config/environment';
import Sequelize from 'sequelize';
import db from '../../sqldb';

const Op = Sequelize.Op;

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
  return Award.findAll({
        attributes: [
          '_id',
          'UserId',
          'ConceptId',
          'BadgeId',
          'date'
        ]
      })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get a list of my awards
export function awards(req, res) {

  return Award.findAll({
    where : {
      UserId : req.params.id
    },
    order : [ [ 'date','ASC'] ],
    attributes: [
      '_id',
      'UserId',
      'ConceptId',
      'BadgeId',
      'date'
    ]
    

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
