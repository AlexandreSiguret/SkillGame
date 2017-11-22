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
import { Game } from '../../sqldb';
import config from '../../config/environment';
import Sequelize from 'sequelize';
import { Question } from '../../sqldb';
import { Answer } from "../../sqldb";
import db from "../../sqldb"



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

function patchUpdates(patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Games
export function index(req, res) {
  return Game.findAll({
  // include : [db.User]
  include: [{
    model: db.User,
    as: 'User2',
    attributes : ["name"]
},
{
  model: db.User,
  as: 'User1',
  attributes :  ["name"]
}],
attributes : { exclude : ["User1Id","User2Id"]}
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function freeGame(req, res) {

  return Game.findAll({
    where: {
      user1: { $ne: req.user._id },
      concept: req.params.id,
      user2: null
    },
    order: Sequelize.fn('RANDOM')
  }).then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


export function game(req, res) {
  var userId = req.user._id;

  return Game.findAll({

    where: {
      user1: req.user._id
    }
  }).then(handleEntityNotFound(res))
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
function allcreation(tab, idquizz, iduser) {
  var taille = tab.length;

  for (var i = 0; i < taille; i++) {

    var creation1 = {
      question: tab[i].dataValues._id,
      user: iduser,
      quizz: idquizz
    }
    var creation2 = {
      question: tab[i].dataValues._id,
      quizz: idquizz
    }

    Answer.create(creation1)
    Answer.create(creation2)

  }

}

export function create(req, res) {
  req.body.user1 = req.user._id


  var new_game = {
    user1: 1,
    concept: 2,
  }

  return Game.create(req.body)
    .then(response => {
      console.log("on essaye")
      Question.findAll({
        order: Sequelize.fn('RANDOM'),
        limit: 2
      }).then(succes => allcreation(succes, response.dataValues._id, req.user._id))
        .then(respondWithResult(res))
        .catch(handleError(res));
    })

  /*
  .then(response =>{
    console.log(response.dataValues);
    var new_answer = {
      question : 1,
      choice : 2,
      earnedPoint : 15,
      user : req.user._id,
      quizz :response.dataValues.concept
    };
    
    Answer.create(new_answer)}
  )   */ .then(respondWithResult(res, 201))
    /*
    
      return Game.create(req.body)
      .then(() =>{
        Question.findAll({ 
          order :         Sequelize.fn( 'RANDOM' ) ,    
          limit : 1
        }).then(res2 =>{     
          var new_answer = {
            question : res2[0].dataValues._id ,    
            earnedPoint : 15,
            user : req.body.user1,
            quizz : req.body._id
          }
          Answer.create(new_answer)
        })  
    
      }   
        
      )    
      .then(respondWithResult(res, 201))
    
     */
    .catch(handleError(res));
}

function regularisation(idquizz,idplayer) {
  console.log("coucou toi")
  console.log(idquizz)
  return Answer.findAll({
    where: {
      quizz: idquizz,
      user: null
    }
  }).then(response => ajoutmultiple(response,idplayer))
}

function ajoutmultiple(tab,idplayer){
  var taille = tab.length;
  for (var i = 0; i < taille; i++){
    var bla = {
      user : idplayer
    }
    console.log(tab[i].dataValues._id)
    Answer.update(bla,{
      where : {
        _id : tab[i].dataValues._id
      }
    })
  }
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
  }).then(regularisation(req.params.id,req.user._id))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Game in the DB
export function patch(req, res) {
  if (req.body._id) {
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
