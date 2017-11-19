/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/messages              ->  index
 * POST    /api/messages              ->  create
 * GET     /api/messages/:id          ->  show
 * DELETE  /api/messages/:id          ->  destroy
 */

'use strict';

//import jsonpatch from 'fast-json-patch';
import { Message } from '../../sqldb';
import config from '../../config/environment';
import Sequelize from 'sequelize';
import { Question } from '../../sqldb';
import { Answer } from "../../sqldb";



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

// Gets a list of Messages
export function index(req, res) {
  return Message.findAll({
        attributes: [
          '_id',
          'expediteur',
          'destinataire',
          'msg_type',
          'message'
        ]
      })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function message(req, res) {
  var userId = req.user._id;

  return Message.findAll({

    where: {
      expediteur: req.user._id
    }
  }).then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get a Message from the DB
export function show(req, res) {
  return Message.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Creates a new Message
 */
export function create(req, res) {
  var newMessage = Message.build(req.body);
  //newMessage.setDataValue('msg_type', '1');
  return newMessage.save()
    .catch(validationError(res));
}


// Deletes a Message from the DB
export function destroy(req, res) {
  return Message.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
