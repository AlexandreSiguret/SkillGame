/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/messages              ->  index
 * POST    /api/messages              ->  create
 * GET     /api/messages/:email       ->  message
 * GET     /api/messages/:id          ->  show
 * DELETE  /api/messages/:id          ->  destroy
 */

'use strict';

import { Message } from '../../sqldb';
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of All Messages
export function index(req, res) {
  return Message.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get a list of my messages
export function messages(req, res) {
  var exped = req.params.email1;
  var dest = req.params.email2;

  return Message.findAll({
    where: Sequelize.or(
      Sequelize.and(
        {expediteur: exped},
        {destinataire: dest} 
      ),
      Sequelize.and(
        {expediteur: dest},
        {destinataire: exped}
      )
    ),
    order: [
      [ 'date','ASC'],
    ],
    attributes: [
      '_id',
      'expediteur',
      'destinataire',
      'msg_type',
      'message',
      'date'
    ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get a Message from the DB
export function show(req, res) {
  return Message.findAll({
    where: {
      _id: req.params.id
    }
  })
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
