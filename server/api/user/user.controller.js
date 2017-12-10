'use strict';

import {User} from '../../sqldb';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.findAll({
    attributes: [
      '_id',
      'name',
      'email',
      'role',
      'provider',
      'avatar'
    ]
  })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

export function notme(req,res){
  return User.findAll({
    where :{
      
      _id: { $ne: req.user._id },
    },
    attributes : [
      "_id",
      "name",
      'email',
      "avatar"
    ]
  }).then( users =>{
    res.status(200).json(users);
  })
  .catch(handleError(res))
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  return newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.find({
    where: {
      _id: userId
    }
  })
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.destroy({ where: { _id: req.params.id } })
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.find({
    where: {
      _id: userId
    }
  })
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

export function uploadFiles(req,res){
  
  console.log("Charger Fichier Function");
  
var storage = multer.diskStorage({
    destination: config.storage,
    filename: function (request, file, callback) {
      callback(null, file.originalname)
      console.log("on essaye");
      console.log(file.originalname)
    }
  });
  // Définition d'un seul parametre
  var upload = multer({storage: storage}).single('file');
  upload(req, res, function(err) {
    if(err) {
      console.log(err);
      return;
    }
    // Retourne le path
    // TODO retourner le bon path, pour l'instant uniquement le nom du fichier
    // et le path est adpater coté client
    res.end("fin");
  })

}

/**
 * Change a users Avatar
 */
export function changeAvatar(req, res) {
    console.log("change Avatar function")
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;
  console.log(userId);
  return User.find({
    where: {
      _id: userId
    },
    attributes: [
      '_id',
      'name',
      'avatar',
      'email',
      'role',
      'provider'
    ]
  })
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
